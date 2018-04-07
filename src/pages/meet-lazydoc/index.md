---
title: Meet LazyDoc
date: "2013-12-25T19:44:00.000Z"
layout: post
---

I've been pretty heads down in a [ThoughtWorks](http://www.thoughtworks.com) project for the better
part of 2013 and have unfortunately neglected this blog. But 2014 is a new year and I want to get
into a semi-regular cadence of posts.

So with that in mind…… another long overdue post! So say hello to
[LazyDoc](https://github.com/ryanoglesby08/lazy-doc), a Ruby gem I have released. LazyDoc provides a
DSL for extracting deeply nested values from a JSON document.

## Working with APIs

In many projects I work on these days, the application consumes a 3rd party or internal API. In
Ruby, it's tempting to just parse a JSON response from an API into a Hash and then pass that around
your application.

```ruby
def extract_user_from(json_body)
  JSON.parse(json_body)
end
```

This "works", but now your application is tightly coupled to the structure of the API response. The
fields your application needs are never defined, making it tough to know what you have available to
use. Is the "name" field "first_name", "firstName", or just "name"?

Ok, easy enough solution for that. Objects to the rescue!

```ruby
class User
  attr_reader :first_name, :last_name

  def initialize(first_name, last_name)
    @first_name = first_name
    @last_name = last_name
  end
end

...

def extract_user_from(json_body)
  body = JSON.parse(json_body)
  User.new(body['first_name'], body['last_name'])
end
```

Now we have separated the JSON response from our application domain. Sweet! Ok, done... Right? Not
quite. There are a few problems here.

1. What about everything else in `json_body`? It is now lost. :(
2. What do you do when you need to extract more information from that JSON response? This code isn't
   very flexible. Either you end up with a constructor that takes in too many arguments, or you end
   up with too many setters on your `User` object.
3. Many times you want to massage your API response data a little bit before adding it to your
   object. These massaging operations end up going into random helper methods that end up being
   duplicated all over your codebase.

We can do better.

## Embedded Document Pattern

The **Embedded Document Pattern** to the rescue! Defined by Martin Fowler
[here](http://martinfowler.com/bliki/EmbeddedDocument.html). With this pattern, instead of parsing
through your documents when they are received and building object graphs, we cache the document and
only parse through it when necessary. Because sometimes your document may be large compared to the
number of properties your application actually needs, you can save complexity and time.

The LazyDoc gem is a Ruby implementation of the Embedded Document Pattern. You maintain access to
the entire JSON response, which makes it easy to add, update, or remove fields from your object as
you need. You retain flexibility. Any massaging that needs to be done to the fields becomes easy to
manage.

So now, with LazyDoc:

```ruby
class User
  include LazyDoc::DSL

  access :first_name, :last_name
  access :address, default: 'NONE PROVIDED'

  def initialize(document)
    lazily_parse(document)
  end
end

...

def extract_user_from(json_body)
  User.new(json_body)
end
```

## Lazy?

So why is it called *Lazy*Doc? The lazy feature is one of the coolest parts of this gem. The
declarative method `access :first_name` merely defines a method that is able to fetch the
`first_name` property from the JSON body. Only upon calling the method will the property be
extracted and massaged according to any defined operations. Additionally, the returned value will be
cached, so any subsequent calls will only return the cached value.

Check the [README](https://github.com/ryanoglesby08/lazy-doc) for more information and examples.
Also, the [acceptance specs](https://github.com/ryanoglesby08/lazy-doc/tree/v0.4.0/spec/acceptance)
have full example usage.

Feel free to download and use in your next project! Feedback is welcome!
