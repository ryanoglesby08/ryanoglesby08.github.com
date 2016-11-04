---
layout: post
title: On Injecting a JavaScript Environment
date: 2016-11-04T16:44:20-05:00
comments: true
categories: ['javascript']
---
Recently, I needed to inject some configuration variables into my client-side app. Because Googling for it turned up a lot of "well, you could maybe do this..." I decided to write down what I see as the 3 main options:

* **Prize for most interesting:** Load configuration at *run time* with XHR.
* **Prize for simplest solution:** Build your application with configuration variables as constants at *compile time*.
* Runner up: Use server-side templating to inject configuration at *render time*.


<!-- more -->

So, what do I want to do again?
----------------------
First, let's define the problem clearly. Handling configuration variables is something most applications need. For server-side applications, there are plenty of options out there. Most involve loading properties from files and then overriding values with environment variables injected at run time - such as the [config package](https://www.npmjs.com/package/config) for node servers.

Client-side applications present some challenges. Because the app is delivered to the client web browser, loading files from the server does not work as easily. Specifying values with environment variables is also different, because the "environment" in a client app is the user's web browser. We don't have access to that JavaScript environment to inject values.

Finally, I want to follow the guidelines set forth by the [Twelve-Factor app](https://12factor.net/config), which boils down to:
* "strict separation of config from code"
* "...stores config in environment variables" rather than environment specific config files

So, let's examine the options, and consider the pros and cons of each.


Load configuration at *run time* with XHR.
-------------------------
With this approach, the client app loads configuration from a remote server with an XMLHttpRequest.

As opposed to the second option, we build our JavaScript application only once, because we do not have to bake in the configuration values. This means we deploy the exact same code to all environments. Score.

We also do not have to use any server side templating, which gives us more freedom in how we deploy and serve our application. We can serve our application as static files if we want to.

This feels like a cool approach to me, but the wrench here is that introducing network calls introduces complexity. Now, all of a sudden your config properties are not available until that call comes back. This can cause some awkward uses based on how/when you need your environment config.

To play with this idea, I wrote this _unreleased_ npm package. Check it out if you are interested and provide feedback or make a pull request! [xhr-env-provider](https://github.com/ryanoglesby08/xhr-env-provider)


Build your application with configuration variables as constants at *compile time*.
-------------------------
This is probably the most straight-forward option, and uses your build tool to inject constants into your code as global variables at compile time. The [DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin) is the best way to do this if you are bundling your app with webpack.

``` bash
export API_URL="http://dev.my-api.some-domain.com"
webpack --define process.env.API_URL="'$API_URL'"
```

``` js
const apiUrl = `${process.env.API_URL || "http://localhost:8080"}`;
```

The downside with this approach is that if your configuration varies for each deployed environment (which it surely will), you will have to build multiple versions of your app. This is less than ideal, as it adds extra steps to your build and deploy process. It also means that the asset you use in lower environments (dev) is not the same as the asset you use in production, because you have re-compiled it.

However, it is likely that you will compile different versions of your app anyway. For example, you probably won't enable source maps for your production build. Webpack support this concept. <http://webpack.github.io/docs/cli.html#development-shortcut-d>

This technique is best suited for externalizing configuration that does not change throughout your build and deploy process. Turning console logging on/off, for example. Locally, you may want console logging to be on, but in all deployed environments you may not want to be doing that.


Use server-side templating to inject configuration at *render time*.
-------------------------
In other words, just throw some globals into the `window` object when the page is rendered. Here is an example using [Pug](https://pugjs.org) (formerly known as Jade)

``` jade views/index.pug mark:9
doctype html
html(lang="en")
  head
    title My App
  body
    div(id="app")

    script(type="text/javascript").
      window.config = {API_URL: "#{API_URL}"};

    script(type="text/javascript" src="/app.js")
```

``` js index.js mark:8
const express = require('express');
const port = process.env.PORT || 4000;
const app = express();

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'pug');
app.get('/', function (req, res) {
  res.render('index', { API_URL: process.env.API_URL });
});

app.listen(port);
```

``` bash
export API_URL="http://dev.my-api.some-domain.com"
node index.js
```

``` js app.js
console.log("The API_URL is: " + window.config.API_URL);
```

Two things here that are not so great. First, we are creating global state, which is something that is generally frowned upon and avoided in modern JavaScript apps (and most applications for that matter). Second, we have to introduce a dependency on a templating engine. This means we can no longer just serve our client application as static assets. With option #1, we could have used something like Amazon S3 to deliver our client app, while now we have to maintain our own server in order to do the templating.

This approach has more of an old-school feel to it with the server-side templating and the global variable.

It might be fine for you though if you are already using server-side templating. This is pretty much the way I did it in the last Rails app I worked on (back in 2014).

Conclusion
------------------------
I think being able to inject env properties at runtime is a cool idea, I just have not discovered what I consider to be a good implementation and use case for that. Using the second approach and injecting environment values at compile time is probably the way to go at this point.
