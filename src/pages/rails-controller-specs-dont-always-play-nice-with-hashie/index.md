---
title: Rails Controller Specs Don't Always Play Nice With Hashie
date: "2012-12-26T14:58:00.000Z"
layout: post
---

## Hashie and Rspec - The Problem:

[Hashie](https://github.com/intridea/hashie) is a neat little Ruby gem that extends Hash and gives object-like access and functionality to hashes. Classes can extend from Hashie and add other functionality as needed. It is especially useful when marshaling JSON or XML data from a service layer into your business models.

While Hashie is very useful, we have to be careful using this gem with ActionController Rspec tests. When creating the `assigns` hash used in controller tests, Rspec creates a `HashWithIndifferentAccess`, which is dangerous with objects that act like Hash (such as Hashie objects). Rspec ends up converting user-defined objects that inherit from Hashie into `HashWithIndifferentAccess` objects, causing us to lose any data that exists outside of the backing hash.

## The Setup:

Lets imagine our Rails application talks to an Employee API exposing JSON data. We have already implemented the service layer that makes the API call and returns Employee objects that extend Hashie. In the EmployeeController we make the service call and assign the resulting Employee object.

```ruby
# employee.rb

class Employee < Hashie::Dash
  property :first_name
  property :last_name

  # foo is not specified using "property" because it does not come from the EmployeeService
  #   JSON response. We are separating what comes from the service and what does not.
  attr_accessor :foo
end
```

```ruby
# employee_controller.rb

class EmployeeController < ActionController
  def show
    @employee = EmployeeService.find_by_id(params[:id])
    @employee.foo = 'extra info'
  end
end
```

## The Tests (Where the conflict occurs):

We should be able to write some simple specs to test the controller, specifically, that the result of the service call is stored in the correct variable passed into the view and that we assign whatever extra processing we need to do outside of the service layer into "foo."

```ruby
# employee_controller_spec.rb

require 'spec_helper'

describe EmployeeController do
  describe 'show' do
    it 'should assign the employee' do
      EmployeeService.stub(:find_by_id) { Employee.new }

      get :show, id: 'employee_id'

      assigns[:employee].should be_an Employee
      assigns[:employee].foo.should == 'extra info'
    end
  end
end
```

You would assume this test would pass right? Nope! Fail!

The output of both assertions would be:

```ruby
expected {"first_name"=>"John", "last_name"=>"Smith"} to be a kind of Employee

NoMethodError: undefined method 'foo' for {"first_name"=>"John", "last_name"=>"Smith"}:ActiveSupport::HashWithIndifferentAccess
```

As you can see, Rails has converted our Employee object into a [HashWithIndifferentAccess](http://api.rubyonrails.org/classes/ActiveSupport/HashWithIndifferentAccess.html)! How dare you Rails?!

## Why would Rails do this?

Well, don't be too quick to point the finger, this is actually a combination of Rspec and Rails (ActiveSupport). Rspec is trying to make it easier for you to use the ActionController `view_assigns` hash by converting it into a `HashWithIndifferentAccess`. Diving into `ActionDispatch::TestProcess` we find the method definition for `assigns`:

```ruby
# test_process.rb

module ActionDispatch
  module TestProcess
    def assigns(key = nil)
      assigns = @controller.view_assigns.with_indifferent_access
      key.nil? ? assigns : assigns[key]
    end
...
```

The easy access to the `view_assigns` hash is great, but looking deeper into the internals of the `with_indifferent_access` method we find that while creating the `HashWithIndifferentAccess`, any assigns variable that is a `Hash` is converted into a `HashWithIndifferentAccess`! Since Hashie classes return true when asked if they are a `Hash`, they also get converted, therefore, losing their original object identity. To me ActiveSupport is stepping over the line here. Yes, give us easy access to the assigns hash, but don't mess with the actual values of that hash unless I tell you to.

## Easy workaround:

First, this problem is unique to Rspec tests - production code does not have this same problem. One solution would be to monkey patch `ActiveSuport::TestProcess` and `ActiveSupport::HashWithIndifferentAccess`. But, since I try to stay away from monkey patching whenever possible, the quick solution is just to not use `assigns` when your object under test is a Hash and you care about it not being converted to a `HashWithIndifferentAccess` for testing purposes.

Instead, use the controller's `view_assigns` hash directly to avoid the conversion to `HashWithIndifferentAccess`:

```ruby
# employee_controller_spec.rb

require 'spec_helper'

describe EmployeeController do
  describe 'show' do
    it 'should assign the employee' do
      EmployeeService.stub(:find_by_id) { Employee.new }

      get :show, id: 'employee-id'

      # Can not use assigns[:employee] here because Employee inherits from Hashie
      controller.view_assigns['employee'].should be_an Employee
      controller.view_assigns['employee'].foo.should == 'extra info'
    end
  end
end
```

In the end, its an easy workaround for a slightly annoying "feature" of Rspec.
