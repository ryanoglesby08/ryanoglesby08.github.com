---
title: Testing JavaScript Web Workers with Jasmine
date: "2014-08-29T15:48:00.000Z"
layout: post
---

JavaScript [Web Workers](https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers) have been around for awhile now, but I had not needed them until recently. Without going into too much domain specific info about the actual use case, I decided to go with Web Workers to handle map reduce style statistic calculations on a data set in the browser.

I was stoked to find the Web Worker API small and straightforward, making it super easy to get up and running. The only real speed bump while getting started was the lack of support in older browsers (IE8 and IE9 you ruin everything). However, turns out there is already a polyfill that works great. :) <https://code.google.com/p/ie-web-worker/>

I am a big proponent of testing my code. After some Googling, I didn’t find anything talking about testing JavaScript Web Workers, hence, this article.

<!-- more -->

## First Attempt:

A long running background worker would be difficult to properly unit test, but my case was a bit simpler. I was posting data to the worker and letting it spit a result back out. I decided to just try the simplest [Jasmine](http://jasmine.github.io/) test first:

_Note: This is just an example with a similar structure as my actual app._

```js
// sum_foo.js

onmessage = function(e) {
  var array = e.data

  var sum = array.reduce(function(sum, element) {
    return sum + element.foo
  }, 0)

  postMessage(sum)
}
```

```js
// sum_foo_spec.js

it('sums the values of foo', function() {
  var worker = new Worker('sum_foo.js')
  worker.onmessage = function(result) {
    expect(result.data).toBe(6)
  }

  worker.postMessage([{ foo: 1 }, { foo: 2 }, { foo: 3 }])
})
```

Surprising to me, this didn't work! :( The test seemed to pass, but there was a Jasmine error.

```
Uncaught TypeError: Cannot read property 'expect' of null
```

What seemed to be going on is that, since this is an asynchronous test, by the time the execution of the test reached the expectation, the jasmine environment was no longer valid or able to perform the assertion.

## UPDATE:

_So in the process of writing this I discovered a more correct solution to my problem, which I have included here. But I decided to keep around the whole post because of the Rails intricacies and my overall problem solving thought process._

Turns out that Jasmine already has support for these type of asynchronous operations with the use of a `done()` function, that Jasmine will use to know when an asynchronous test has finished.
http://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support

```js
// sum_foo.js_spec

it('sums the values of foo', function(done) {
  var worker = new Worker('sum_foo.js')
  worker.onmessage = function(result) {
    expect(result.data).toBe(6)
    done()
  }

  worker.postMessage([{ foo: 1 }, { foo: 2 }, { foo: 3 }])
})
```

This is the solution I will be going with, but if you keep reading you will see something I came up with that uses promises to place the assertion AFTER "postMessage," which I find easier to read and reason about when doing asynchronous tests.

**Lesson learned here: always read the documentation fully and upgrade if you can first.**

## Second Attempt:

Time to be clever. Since my goal was to test the Web Worker code itself, I decided to reverse engineer the Web Worker API. I realized that the Worker was making an XMLHttpRequest to grab the script and then executing the code in its own context, so I took a similar strategy:

```js
// sum_foo_spec.js

it('sums the values of foo', function() {
  var http = new XMLHttpRequest()
  http.open('GET', 'sum_foo.js', false)
  http.send()

  var workerCode = http.responseText

  // This will define the worker's "onmessage" function in the context of this test
  eval(workerCode)

  // Callback when the worker has done its work
  function postMessage(result) {
    expect(result).toBe(6)
  }

  // Execute the action under test
  onmessage({ data: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] })
})
```

Success!

## Improvements:

Now that I had a working solution, I had to write more tests for more workers (so far my app has 14 workers and maybe more to come), which means reusability. I wanted to extract away all the hairiness of requesting the worker script and evaling it into the current context. I also don’t like writing the expectation before the action of the test, so I turned to promises to help out.

_Note: using jQuery’s Deferred here as my promise library because I already have jQuery in the project._

```js
// worker_helper.js

var getWorker = function(path) {
  http = new XMLHttpRequest()
  http.open('GET', path, false)
  http.send()

  return http.responseText
}

var workerTester = function(workerCode) {
  var deferred = $.Deferred()

  // Define onmessage from the worker
  eval(workerCode)

  // The worker will call this method with the post-back data
  function postMessage(data) {
    deferred.resolve(data)
  }

  var thenAssertOn = function(assertion) {
    deferred.promise().then(function(data) {
      assertion(data)
    })
  }

  var sendMessage = function(data) {
    // Call into the worker code
    onmessage({ data: data })

    return { thenAssertOn: thenAssertOn }
  }

  return { sendMessage: sendMessage }
}
```

```js
// sum_foo_spec.js

var workerCode = getWorker('sum_foo.js')

it('sums the values of foo', function() {
  workerTester(workerCode)
    .sendMessage([{ foo: 1 }, { foo: 2 }, { foo: 3 }])
    .thenAssertOn(function(sum) {
      expect(sum).toBe(6)
    })
})
```

Bingo! I was pretty happy with the final solution. It made testing of the rest of the workers trivial. And it works both in the browser and in a headless environment such as phantomjs.

## Rails Setup:

I am using Rails 4 on the backend for this, which actually took a bit of time to get everything set up to work correctly in a Rails pipeline. Here is what I’ve done.

1. All workers are in a separate folder: "app/assets/javascripts/workers"
2. "application.js" does _NOT_ require the workers. As I alluded to, when instantiating a worker with `new Worker(‘script_name.js’)`, an AJAX request is made to the server to fetch the resource, so compiling it into application.js isn't necessary
3. Add all workers to the precompile array: `config.assets.precompile += Dir.chdir(File.join(Rails.root, 'app/assets/javascripts')) { Dir['workers/*.js'] }`
4. Instantiate workers using inline JavaScript in application.html: `new Worker('#{javascript_path("workers/script_name.js")}');`
   _Notice the use of `javascript_path`. The workers are being precompiled by the asset pipeline and will need the MD5 checksum._

The final issue was with [jasmine_rails](https://github.com/searls/jasmine-rails). Running `rake spec:javascript` worked fine, but when running `RAILS_ENV=test rake spec:javascript`, the worker scripts were not able to be fetched and thus a lot of tests failed. When jasmine rails runs, it copies all the files it needs into its own temp directory (tmp/jasmine by default). I ended up figuring out that running the jasmine specs in the TEST environment causes the src and spec files you specified in your jasmine.yml to be concatenated into a single jasmine-specs.js file, copied into tmp/jasmine, and included in the jasmine runner.html file. This meant the workers were not available to be fetched via AJAX. The solution I found is to use a custom spec runner layout file that manually includes the workers. This causes them to be copied into tmp/jasmine along with the concatenated jasmine-specs.js file, and available for fetching by the Web Worker.

```haml
// app/views/layouts/jasmine_rails/spec_runner.html.haml

!!!
%html
  %head
    %meta{content: 'text/html;charset=UTF-8', 'http-equiv' => 'Content-Type'}
    %title
      Jasmine Specs

    = stylesheet_link_tag *jasmine_css_files

  %body
    #jasmine_content
    = yield

    = javascript_include_tag *jasmine_js_files
    = javascript_include_tag *Dir.chdir(File.join(Rails.root, 'app/assets/javascripts')) { Dir['workers/*.js'] }
```

(<https://github.com/searls/jasmine-rails#custom-helpers>)

So a few hoops to jump through, but now I’m very happy with the Web Workers and the testing strategy I arrived at.
