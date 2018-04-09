---
title: On Injecting a JavaScript Environment
date: "2016-11-04T16:44:20.000Z"
layout: post
---

**Updated 2017-02-12**: Added a strategy for loading configuration at initial page load, using an
"env.js" file.

Recently, I needed to inject some configuration variables into my client-side app. Because Googling
for it turned up a lot of "well, you could maybe do this..." I decided to write down what I see as
the 3 main options:

* **Best in show:** Load configuration at _run time_.
* **Prize for simplest solution:** Build your application with configuration variables as constants
  at _compile time_.
* Runner up: Use server-side templating to inject configuration at _render time_.

<!-- more -->

## So, what do I want to do again?

First, let's define the problem clearly. Handling configuration variables is something most
applications need. For server-side applications, there are plenty of options out there. Most involve
loading properties from files and then overriding values with environment variables injected at run
time - such as the [config package](https://www.npmjs.com/package/config) for node servers.

Client-side applications present some challenges. Because the app is delivered to the client web
browser, loading files from the server does not work as easily. Specifying values with environment
variables is also different, because the "environment" in a client app is the user's web browser. We
don't have access to that JavaScript environment to inject values.

Finally, I want to follow the recommendations for configuration of the
[Twelve-Factor app](https://12factor.net/config), which boil down to:

* "strict separation of config from code"
* "...stores config in environment variables" rather than environment specific config files

So, let's examine the options, and consider the pros and cons of each.

## Load configuration at _run time_

This is strategy I went with, and seems to be working well. With this approach, the client app loads
configuration from a remote server on initial page load.

Because we do not have to bake in the configuration values to the compiled JavaScript, (one of the
other options) we get to build our application only once. This means we deploy the exact same code
to all environments. Score.

We also do not have to use any server side templating, which gives us more freedom in how we deploy
and serve our application. We can serve our application as static files if we want to.

The trick here is to build a little bit of smarts into our web server, so that it converts an
injected set of environment variables to a JavaScript file on startup, and then serves it as a
static file.

Here is the gist:

1. In your `index.html` file, add a script tag for an "env.js" file, which does not exist. (yet)
2. In your application server code, write the "env.js" file on startup using an environment variable
   as the contents. Then statically serve the directory containing the "env.js" file.
3. Make the environment variable available to the server when running it.

```html{4}
<!-- 1. index.html -->
<html>
<body>
  <script type="text/javascript" src="/env.js"></script>
  <script type="text/javascript" src="/app.js"></script>
</body>
</html>
```

```js{9-12,15}
// 2. server.js

const express = require('express')
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 8080
const app = express()

fs.writeFileSync(
  `${__dirname}/config/env.js`,
  `var config = ${process.env.CLIENT_ENV};`
)

app.use(express.static(__dirname + '/dist'))
app.use(express.static(__dirname + '/config'))
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port)
```

```bash
# 3. running the server

export CLIENT_ENV='{API_URL: "http://dev.my-api.some-domain.com"}'
node server.js
```

One of the downsides here is that we are creating global state, the `config` variable, which is
something that is generally frowned upon and avoided in modern JavaScript apps (and most
applications for that matter). There are a few ways to address this, with the simplest being to
agree not to read from the `config` variable directly, and create a function that your application
always uses to access it. This way, the only place in your codebase where the config variable is
touched is that function. You should also **never** modify the config variable. Treat it as read
only.

### An experiment - asynchronous configuration loading

Along similar lines, I also played with loading configuration from a remote server with an
XMLHttpRequest. This feels like a cool approach, but the wrench here is that introducing
asynchronous network calls introduces un-necessary complexity. Now, all of a sudden your config
properties are not available until that call comes back. This can cause some awkward uses based on
how/when you need your environment config.

To play with this idea, I wrote this _unreleased_ npm package. Check it out if you are interested
and provide feedback or make a pull request!
[xhr-env-provider](https://github.com/ryanoglesby08/xhr-env-provider)

## Build your application with configuration variables as constants at _compile time_.

This is probably the most straight-forward option, and uses your build tool to inject constants into
your code as global variables at compile time. The
[DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin) is the best way to
do this if you are bundling your app with webpack.

```bash
## building your app

export API_URL="http://dev.my-api.some-domain.com"
webpack --define process.env.API_URL="'$API_URL'"
```

```js
// inside your application code

const apiUrl = `${process.env.API_URL || 'http://localhost:8080'}`
```

The downside with this approach is that if your configuration varies for each deployed environment
(which it surely will), you will have to build multiple versions of your app. This is less than
ideal, as it adds extra steps to your build and deploy process. It also means that the asset you use
in lower environments (dev) is not the same as the asset you use in production, because you have
re-compiled it.

However, it is likely that you will compile different versions of your app anyway. For example, you
probably won't enable source maps for your production build. Webpack support this concept.
<http://webpack.github.io/docs/cli.html#development-shortcut-d>

This technique is best suited for externalizing configuration that does not change throughout your
build and deploy process. Turning console logging on/off, for example. Locally, you may want console
logging to be on, but in all deployed environments you may not want to be doing that.

## Use server-side templating to inject configuration at _render time_.

In other words, just throw some globals into the `window` object when the page is initially
rendered. Here is an example using [Pug](https://pugjs.org) (formerly known as Jade)

```pug{11}
<!-- views/index.pug -->

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

```js{11}
// server.js

const express = require('express')
const port = process.env.PORT || 8080
const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/assets'))
app.set('view engine', 'pug')
app.get('/', function(req, res) {
  res.render('index', { API_URL: process.env.API_URL })
})

app.listen(port)
```

```bash
# running the server

export API_URL="http://dev.my-api.some-domain.com"
node server.js
```

```js
// app.js

console.log('The API_URL is: ' + window.config.API_URL)
```

Two things here that are not so great. First, we are creating global state again. Second, we have to
introduce a dependency on a templating engine. This means we can no longer just serve our client
application as static assets. With option #1, we could have used something like Amazon S3 to deliver
our client app, while now we have to maintain our own server in order to do the templating.

This approach has more of an old-school feel to it with the server-side templating and the global
window variable.

It might be fine for you though if you are already using server-side templating. This is pretty much
the way I did it in the last Rails app I worked on (back in 2014).

## Conclusion

I think being able to injecting env properties at runtime is the way to go for large-scale
production applications, as it gives you the most flexible options for local development and
deployments. But, if you want a quick win for a side-project or small app, injecting at compile time
is super easy. I probably wouldn't use the server-side templating unless I was working on an
application that was already doing that.
