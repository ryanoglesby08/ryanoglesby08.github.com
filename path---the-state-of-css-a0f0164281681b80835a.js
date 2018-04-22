webpackJsonp([83506780613913],{507:function(e,n){e.exports={data:{site:{siteMetadata:{title:"Ryan Oglesby"}},markdownRemark:{id:"/Users/ryanoglesby/Projects/blog/src/src/pages/the-state-of-css/index.md absPath of file >>> MarkdownRemark",html:'<p>It’s no secret that we are currently experiencing a Cambrian explosion of innovation by the\nJavaScript community. But what you may not be aware of are the equally evolutionary innovations\nunder development by the CSS community.</p>\n<p>CSS has quietly been improving by leaps and bounds lately. So much so, that you may not even\nrecognize it much anymore. While you weren’t looking, the CSS community has developed real solutions\nto many of the oddities, hacks, and deficiencies that made CSS the black sheep of the front end\nfamily in the past.</p>\n<p>In this post I’ll reveal 5 old-fashioned CSS things that you don’t need to do anymore, and what you\nshould do instead.</p>\n<ol>\n<li>You don’t need a naming convention.</li>\n<li>You don’t need float.</li>\n<li>You don’t need a grid framework.</li>\n<li>You don’t need a preprocessor.</li>\n<li><strong>You don’t need CSS.</strong></li>\n</ol>\n<!-- more -->\n<h2>You don’t need naming conventions.</h2>\n<p>And we begin with the number one problem with CSS, especially at scale: everything is global.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/global-css-8ec23da8da2902dc9c22b4f033972e16-5d9c9.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 75.07692307692308%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABcSAAAXEgFnn9JSAAABsklEQVQ4y61U226CQBBF8IoBrApyB+PtwRugqMSnNj74/z90ujMKTZvUGtOHydndmT1zZmZBkiQJ/2yPA6IoxHq1QhiGMHT9OcJarYZ6vQ5FUdgajQYb+eI4QpamuFwusEcWyniykuTHXkKz2cR4PBYqAriuhyAgdBEKdaZlvlYyKQpEWbP5nMsjnE6nnKyMUVUVrueyfzKZsJGQ+WLBseSvCNvtNmzbhi/UeZ7Ha1mWv2VvtVoYjWwmMgyDk9EZ3SW8x39l932PM8ZxLIYRQRdD0DStIqQLmqYLUqvq8a8lq90ukxAhYeD7jI7jvNbDsmQayCOSnxP+lbDT6YiSfW5uFEaYzWaC3H/tYdMb7Pf76PV6GAwGvH57u+113UC3q3I/y56S0ZoGU57T+60IPc/H6VRgt9shyzJstwnSNMNms0GeH5AkWxyOR+z3+7t/y5gfcj6je8Ph8IuQNpZlwTRN7uMNHQzu56SoL5SXPssi/6iKp4+A1FaEjvg6KMtyuRRKj0JVLhTssF6vcT6f8f7xgev1iqIohPKUFZaYJAlOxYkFPPVzoN6QClIqy8qfQ/kEDchc4+UNd2sAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Problems with CSS at scale"\n        title=""\n        src="/static/global-css-8ec23da8da2902dc9c22b4f033972e16-fb8a0.png"\n        srcset="/static/global-css-8ec23da8da2902dc9c22b4f033972e16-1a291.png 148w,\n/static/global-css-8ec23da8da2902dc9c22b4f033972e16-2bc4a.png 295w,\n/static/global-css-8ec23da8da2902dc9c22b4f033972e16-fb8a0.png 590w,\n/static/global-css-8ec23da8da2902dc9c22b4f033972e16-5d9c9.png 650w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n     <small>Source:\n<a href="https://speakerdeck.com/vjeux/react-css-in-js">https://speakerdeck.com/vjeux/react-css-in-js</a></small></p>\n<p>Because all selectors exist in the same global namespace, over time it becomes very likely that\nyou’ll run into unexpected side effects such as selectors targeting elements that you didn’t intend,\nor selectors being overridden by other selectors. So, we have side-stepped these issues with\nmethodologies (<a href="http://oocss.org/">OOCSS</a>, <a href="https://smacss.com/">SMACSS</a>, or the more popular\n<a href="http://getbem.com/">BEM</a>) that define naming conventions to help us avoid class name collisions.</p>\n<p>While we can’t discount the importance of these methodologies, they are merely a workaround. They\ndon’t actually solve the problems. We needed something more. And then\n<a href="https://medium.com/seek-blog/the-end-of-global-css-90d2a4a06284">this</a> happened.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/end-of-global-css-d523ceb2e7229ffd640053a7d6be5f96-46413.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 67.37309019221291%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC4klEQVQ4y5WPz28iZRjH51/x7NHozbpZV1oKtSyFwszA/AKGAWZgOgOUeFo1mjT+AR42MXpooWjdrGnV9eRp9eLJxD+gFy+mSyuBFqZ8fGGz2qtP8sn3+ZXv+z7S6OIvfvvjT37+5XcuL0eMpxHj8ZjpdMoyFovFv/oq/69+mUfRLZPpnJtZhDSZTBhPrnkxumQ2m4nmnOvr65XhfD5b9Zb1anZzs8qXzOfz1c6yH0UR09XOHGk5iKI5i9tbzs/PGY1ecHV1Kfibq/F0ZXKXu4ZLs6W+IhJI3Innz3/l4mLErThFXEG04H+HdHJyzOnTIaffDfnx7Jifvh/y7GzID6fHnD0drHgm8tMnfb4ZDBgc9fn88SGPvzjkyUmfr4d9vvzqkP7REd+eDJDeXIuT2EpQkLcoG0m8SgK3vEndjOMYcWxtA0ffQM/FSMTWeeOt+7z2+j3W7r1LfidGKhnjnbUHbG2us5uOI729KZPKqFi6xs6uQsUs0KwX6LRUur6y0iV7dZVcVubBeoZYPIuS36Vhy9imTMWQcW0Vt1pASjxUSO2opHdV7icV4ilRZ1WcSpHQK9LxhbmvErgqJU3BLCjkMjK6KmMZCl6twJ6n4Xs6oW8gFQs6iqqT2tVIZopspIskshpbGY2CZojfmoRNbWUeeAZ+w8K2dDbFw8m0KmqDoGXSCSzagYmk6GXyxTLbcom0WiIl9P2cRTxjsp0voWolanaZhmOxH1bohQ6WWSL+UMexS/iumItZU+heq4y0rdXZLtZ4T3aEOiilOla1Qc5wSBWqyKZDXq+ynq2gGjYtr4rjOMKkJk6sUTQqyFoFv1Wn220gqfWAvO2TsppsFOskBUrZpeZ6OA2Xct1FFw+oFZes6WI6Lq7n0RB4zSZ2w6PX82l3fTrdFlK53aMUvqTz0QH7Hx8QPDqgJ/SDTz6j/ehTwg8PMJsd3KBNsN/BckOMRkDQbdPpiX4YUtsLxazNPzgry2FvhvLJAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="A screenshot of The End of Global CSS article on Medium"\n        title=""\n        src="/static/end-of-global-css-d523ceb2e7229ffd640053a7d6be5f96-fb8a0.png"\n        srcset="/static/end-of-global-css-d523ceb2e7229ffd640053a7d6be5f96-1a291.png 148w,\n/static/end-of-global-css-d523ceb2e7229ffd640053a7d6be5f96-2bc4a.png 295w,\n/static/end-of-global-css-d523ceb2e7229ffd640053a7d6be5f96-fb8a0.png 590w,\n/static/end-of-global-css-d523ceb2e7229ffd640053a7d6be5f96-526de.png 885w,\n/static/end-of-global-css-d523ceb2e7229ffd640053a7d6be5f96-fa2eb.png 1180w,\n/static/end-of-global-css-d523ceb2e7229ffd640053a7d6be5f96-08f6a.png 1770w,\n/static/end-of-global-css-d523ceb2e7229ffd640053a7d6be5f96-46413.png 2029w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n     <small>Source:\n<a href="https://medium.com/seek-blog/the-end-of-global-css-90d2a4a06284">https://medium.com/seek-blog/the-end-of-global-css-90d2a4a06284</a></small></p>\n<p><a href="https://twitter.com/markdalgleish">Mark Dalgleish</a> and others have since pioneered the concept of\n<strong>locally scoped CSS</strong>, which led to the development of\n<a href="https://github.com/css-modules/css-modules">CSS Modules</a>, and which has now been incorporated into\nmodern tooling, most notably webpack’s\n<a href="https://github.com/webpack-contrib/css-loader#modules">css-loader</a>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// webpack.config.js</span>\n\n<span class="token punctuation">{</span>\n  test<span class="token punctuation">:</span> <span class="token regex">/\\.css$/</span><span class="token punctuation">,</span>\n  use<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      loader<span class="token punctuation">:</span> <span class="token string">\'css-loader\'</span><span class="token punctuation">,</span>\n      options<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        modules<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        localIdentName<span class="token punctuation">:</span> <span class="token string">\'[path][name]__[local]--[hash:base64:5]\'</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>This is huge. When using CSS Modules, name your classes however you like. <strong>At build time, all local\nselectors are replaced by unique identifiers, completely removing the need for a global naming\nconvention.</strong> Check out the docs above for CSS Modules for a deeper dive.</p>\n<p>While this technology was born from component-oriented front-end development (think\n<a href="http://www.reactjs.com">React</a>), you can also get support for CSS Modules\n<a href="https://github.com/css-modules/postcss-modules">everywhere</a>.</p>\n<hr>\n<h2>You don’t need float.</h2>\n<p><a href="https://css-tricks.com/all-about-floats/">Float</a> has managed to become both the positioning\nproperty of choice and the bane of many a developer’s existence by weaseling its way into everything\nfrom <a href="http://getbootstrap.com/css/#helper-classes-floats">helper classes</a> to\n<a href="https://unsemantic.com/demo-responsive">entire grid systems</a>. While occasionally using float to\npush an element left or right doesn’t get you into too much trouble, pervasive use of it for full\npage layouts leads to odd behavior that is a pain to figure out and fix, often requiring hacks.\nPretty soon you find yourself copying the admittedly elegant, yet unintuitive\n<a href="https://css-tricks.com/snippets/css/clear-fix/">“clearfix”</a> onto every element and hoping for the\nbest.</p>\n<p>Thankfully, CSS3 introduced a new layout module called flexible boxes, or\n<a href="https://www.w3schools.com/css/css3_flexbox.asp">Flexbox</a> for short. Flexbox is a mostly\n1-dimensional layout system that ensures elements behave predictably on various screen sizes and\ndevices. It also solves the common, yet previously frustrating task of vertical and horizontal\ncentering. <strong>When you switch to Flexbox, you no longer have any use for float.</strong></p>\n<p data-height="320" data-theme-id="0" data-slug-hash="GmbYjd" data-default-tab="result" data-user="ryanoglesby08" data-embed-version="2" data-pen-title="GmbYjd" class="codepen">See the Pen <a href="https://codepen.io/ryanoglesby08/pen/GmbYjd/">GmbYjd</a> by Ryan Oglesby (<a href="https://codepen.io/ryanoglesby08">@ryanoglesby08</a>) on <a href="https://codepen.io">CodePen</a>.</p>\n<p>While Flexbox is <a href="http://caniuse.com/#feat=flexbox">fully supported by all modern browsers</a>, you\nwill run into issues on older ones. So, if you have to support IE &#x3C; 10 you will likely still need to\nfall back to floats, tables, or some other layout method.</p>\n<p>Some browsers also need vendor prefixes, so I recommend using\n<a href="https://github.com/postcss/autoprefixer">Autoprefixer</a> to get the most coverage.</p>\n<hr>\n<h2>You don’t need a grid framework.</h2>\n<p>Everyone uses a grid. It’s a crucial part of every CSS codebase, letting you build complex full-page\nlayouts by aligning elements along rows and columns. While rolling your own simple grid using\ntraditional techniques is <a href="https://css-tricks.com/dont-overthink-it-grids/">fairly straightforward</a>,\nno one does it. Instead, we reach for one of the many grid frameworks, such as the original\n<a href="https://960.gs/">960gs</a> or the Sass-based <a href="http://neat.bourbon.io/">Bourbon Neat</a>.</p>\n<p>Finally, as of March 2017, most browsers added support for the\n<a href="https://css-tricks.com/snippets/css/complete-guide-grid/">CSS Grid Layout</a>, a 2-dimensional layout\nsystem built directly into CSS. Since most traditional grid frameworks still rely on float, CSS Grid\nis an attractive alternative. CSS Grid makes it easy to define your own grid without the help of a\nframework by providing an intuitive interface for defining the number and sizes of rows and columns,\nthe gutter spacing, alignment of elements within the grid, named areas, and more.</p>\n<p data-height="253" data-theme-id="0" data-slug-hash="pwzNdB" data-default-tab="css" data-user="ryanoglesby08" data-embed-version="2" data-pen-title="pwzNdB" class="codepen">See the Pen <a href="https://codepen.io/ryanoglesby08/pen/pwzNdB/">pwzNdB</a> by Ryan Oglesby (<a href="https://codepen.io/ryanoglesby08">@ryanoglesby08</a>) on <a href="https://codepen.io">CodePen</a>.</p>\n<p><a href="http://caniuse.com/#feat=css-grid">At the time of writing this article</a>, CSS Grid is supported by\nall modern browsers, with partial support on IE if you use vendor prefixes (use\n<a href="https://github.com/postcss/autoprefixer">Autoprefixer</a>).</p>\n<hr>\n<h2>You don’t need a preprocessor.</h2>\n<p>Undeniably, CSS language extensions such as <a href="http://sass-lang.com/">Sass</a> and\n<a href="http://lesscss.org/">Less</a> brought game-changing features to CSS, including data reuse with\nvariables, better organization with nesting, and property reuse with mixins. But, these languages\ndidn’t change anything about the core language of CSS; they added a layer of abstraction on top of\nit. In the case of Sass, you also need an <a href="http://sass-lang.com/libsass">additional binary</a> to\ncompile the Sass files into CSS. When using one of these preprocessors, you now have to learn CSS\n<em>and</em> the preprocessor specific syntax.</p>\n<p>But, while most developers were blissfully coupling to their preprocessors, CSS was quietly\nprogressing. Modern browsers now have native support for\n<a href="https://www.w3.org/TR/css-variables/">CSS variables</a> and\n<a href="https://www.w3.org/TR/css3-values/#calc">calc()</a>. Other features such as\n<a href="https://drafts.csswg.org/css-color/#modifying-colors">color modifications</a>, and\n<a href="http://tabatkins.github.io/specs/css-apply-rule/">mixins</a> are not far behind.</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">:root</span> <span class="token punctuation">{</span>\n  <span class="token property">--spacing</span><span class="token punctuation">:</span> 1.5em<span class="token punctuation">;</span> <span class="token comment">/* declaring a variable */</span>\n  <span class="token comment">/* declaring a mixin */</span>\n  <span class="token selector">--base-colors:</span> <span class="token punctuation">{</span>\n    <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>\n    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">color</span><span class="token punctuation">(</span>#fff <span class="token function">shade</span><span class="token punctuation">(</span>+80%<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* modifying a color */</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.some-class</span> <span class="token punctuation">{</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--spacing<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span>100% - <span class="token function">var</span><span class="token punctuation">(</span>--spacing<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* dynamically calculating a value */</span>\n  <span class="token atrule"><span class="token rule">@apply</span> --base-colors<span class="token punctuation">;</span></span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Fortunately for CSS, the JavaScript community has already had the problem of browsers not supporting\nnew features fast enough, which led to <a href="https://babeljs.io/">Babel</a>, giving JavaScript developers\neverywhere access to “next generation JavaScript, today.” Similarly, <a href="http://postcss.org/">PostCSS</a>\nis a “tool for transforming CSS with JavaScript”, which gets its power from the extensive list of\ncommunity maintained <a href="https://github.com/postcss/postcss/blob/master/docs/plugins.md">plugins</a>. CSS\ndevelopers can even “use tomorrow’s CSS syntax, today” with the <a href="http://cssnext.io/">cssnext</a>\nPostCSS plugin.</p>\n<p><strong>Writing plain CSS and transforming it with PostCSS plugins produces more future-proof CSS with\nless cognitive and technical overhead than old preprocessors.</strong></p>\n<hr>\n<h2>You don’t need CSS.</h2>\n<p>Ok, so that’s not entirely true. While CSS remains the only document styling language that browsers\nunderstand, <strong>you can style web applications without ever writing a single .css file</strong>. With the\nhelp of UI libraries such as React or Vue.js, modern web application architecture has embraced\nloosely coupled, highly cohesive components that often co-locate HTML, CSS, and JavaScript in the\nsame file. Interestingly, this idea is in direct contradiction to previously held best practices\naround separation of these concerns.\n(<a href="https://www.youtube.com/watch?v=x7cQ3mrcKaY">This conference talk</a>, called “Rethinking best\npractices” gives a great explanation.)</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/separation-of-concerns-17290be36e6368e126f1ffc54da3e044-a4141.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 60.57196436943273%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABcSAAAXEgFnn9JSAAACZUlEQVQoz12TS2gTURSGZ6XbQgl1ocb6QK0tXYjFnbhzoTvBhWi1hqJiES216caCCD6Qio1oatI8GkLA4COLLqyCIK5UXKRJTIxYsJaahpAmTeZxZ+783nsnk0QP/HPOzJz7nTn3npHA7PfyMlKpNLK5HPL5H/i5tIRsNotf7Dk30zSFl2UZ6UwGyeSiyP2ez+Mby8uxuFqtihzJTtxgDxS5DlWRQTQVcr0GTVWbQC5KKaqVCgqFAtbW1lAqlVAsFhmsAl3XLaBdnV8VYkDRjYanwtsge4FhtolanqU2C0uEAbjNLCxi06kn6Bryw3Hej46zz+C8GMJKqSbea4QIfyfxEdfm3mA89k5oLPoWN+PvoTU4km5Y+MiHDJyXfOgbDaP3egj7rgZxyB3FatkCKpom/I34C5zxB+AKRZjmMBQM40o0BtVuWadWEEgH0entxM7gLnQHurF1dht6IgewWlsFWE1ZVUSee2Eagy8nMZy4LeR6fQsj8/cZ0CooEYOIDQylgtjy1IG9gd3YM8ugvu3oD/daQNaNospiQXDejanYIDzxYaFHz13wvhoB0a0DlCjbG842ExHQoztAT/SDHu8DPbYf9OQAUPwD3gM/fW5J3xg+3TuNL1MXhD4/OIevnsswSANosL3Z4MCYF+jZDBzuAgYcwMEO4IgTKKzwjkEaLVdCd1F+OIr1xxNY90ygPD2OyswkTKK15tA6cgrT0JmMf8StfWw4WGNzSxRFiMcqm1l7/CR7aE0bjJbZcTuwzgDVWk2IsII1ds/VBKIRCP+fmkPPvNH4Wh7X2R/Fi9jFWl2a+AvO1Ub2ehUzhAAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Separation of concerns with HTML, CSS, and JS"\n        title=""\n        src="/static/separation-of-concerns-17290be36e6368e126f1ffc54da3e044-fb8a0.png"\n        srcset="/static/separation-of-concerns-17290be36e6368e126f1ffc54da3e044-1a291.png 148w,\n/static/separation-of-concerns-17290be36e6368e126f1ffc54da3e044-2bc4a.png 295w,\n/static/separation-of-concerns-17290be36e6368e126f1ffc54da3e044-fb8a0.png 590w,\n/static/separation-of-concerns-17290be36e6368e126f1ffc54da3e044-526de.png 885w,\n/static/separation-of-concerns-17290be36e6368e126f1ffc54da3e044-fa2eb.png 1180w,\n/static/separation-of-concerns-17290be36e6368e126f1ffc54da3e044-08f6a.png 1770w,\n/static/separation-of-concerns-17290be36e6368e126f1ffc54da3e044-a4141.png 2133w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n     <small>Source:\n<a href="https://speakerdeck.com/didoo/let-there-be-peace-on-css">https://speakerdeck.com/didoo/let-there-be-peace-on-css</a></small></p>\n<p>From a CSS perspective, this rethinking has even been given a catchy name:\n<a href="https://speakerdeck.com/vjeux/react-css-in-js">CSS-in-JS</a>.</p>\n<p>At first, CSS-in-JS libraries used the HTML “style” attribute to attach styles onto elements, a\nflawed approach because the “style” attribute can’t do everything CSS can do. Now, most libraries\ngenerate real style sheets with the full power of CSS, eschewing use of the “style” attribute for\nthe most part.</p>\n<p>Writing CSS using JavaScript addresses most of the other points I’ve brought up in this article.\nMost new libraries scope styles automatically, make reuse of classes easy and efficient, identify\nand inline critical-path CSS for faster initial load times, and enable real modular sharing of\nopen-source CSS packages.\n<a href="https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660">This must-read article</a>\noutlines the architectural benefits for CSS-in-JS and is the best I’ve read so far.</p>\n<p>As this space is new and exciting, there has been an\n<a href="https://github.com/MicheleBertoli/css-in-js">explosion of libraries</a> (this list is even slightly\nold now). This is a good thing. It will take some time to settle down as the community discovers\nbest practices, such as avoidance of the “style” attribute, proper support for media queries, and\nthe ability to use proper CSS syntax instead of a JavaScript object.</p>\n<p><a href="http://cssinjs.org/">JSS</a> is a very popular choice, with an active community and a stable\ninterface; but I’m especially excited about the direction of\n<a href="https://www.styled-components.com/">styled-components</a>, which cleverly attaches CSS to components\nvia\n<a href="https://www.styled-components.com/docs/advanced#tagged-template-literals">tagged template literals</a>.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/styled-components-937c594b557f9956693c6a9351af1466-cf391.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 45.9915611814346%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAABq0lEQVQoz5WRS2/TQBRGvUcI2hKgediJ3fgxTmynpAT4BQghBKI0TaGCJYIiVNoQgsrfgkXZsEJIdMGfqKB5uFRAIME+TIwQSLSoXOnozuY7c++M0m5t0Gw+ZX2tzXqzzeMnG6w+anF/ZZWVB2vcvfeQVvsZ4U6XYbjHoBPybe8Tg/c9ui/e0Nt8S+f5awbbXSJAMQ0Xu+Cg6wZ5U+PktMrEVJbjk2nZMxw5mkIvlulsf4DPXxNp9EX27kfCl1vsvnpHuLnFcGeXcSnVyjlqfg2/WqY85+J4Ai3vJBQMQSZXpDJ7gV4YJoGYgyuOYxS/VKVke4jAwTtrIyoWM45FoWiR02xOp3W8oEav109CURQlwYTv0W/in1cpjnsGx/Uxbbm6CHC9gFLZxSgKKbT+Ev4KHlSK7QZyMoE3J3B8gVUSmI6NKmVq3v5/oSWnyqommvyYsSCn2smq43NeF6SzMwSz5/dfeR8UywmYzhhMnsgylcr9gUrqlMaxibR8Dv/wEzYat1lauEVdsrC4zI36MvX5Ja5fW+TylXkuXrpK4+Yd+v1+IhuORoz+wQ+8he8TgaNGaQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Styled Components example"\n        title=""\n        src="/static/styled-components-937c594b557f9956693c6a9351af1466-fb8a0.png"\n        srcset="/static/styled-components-937c594b557f9956693c6a9351af1466-1a291.png 148w,\n/static/styled-components-937c594b557f9956693c6a9351af1466-2bc4a.png 295w,\n/static/styled-components-937c594b557f9956693c6a9351af1466-fb8a0.png 590w,\n/static/styled-components-937c594b557f9956693c6a9351af1466-526de.png 885w,\n/static/styled-components-937c594b557f9956693c6a9351af1466-fa2eb.png 1180w,\n/static/styled-components-937c594b557f9956693c6a9351af1466-08f6a.png 1770w,\n/static/styled-components-937c594b557f9956693c6a9351af1466-cf391.png 1896w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n     <small>Source:\n<a href="https://www.styled-components.com">https://www.styled-components.com</a></small></p>\n<hr>\n<h2>CSS is dead. Long Live CSS.</h2>\n<ul>\n<li>You don’t need naming conventions because <em>locally-scoped styles by default are now baked-in to\nlibraries</em>.</li>\n<li>You don’t need float because <em>Flexbox is more powerful and less hacky</em>.</li>\n<li>You don’t need a grid framework because <em>there’s one built into CSS</em>.</li>\n<li>You don’t need a preprocessor because <em>CSS has more advanced features now</em>.</li>\n<li>You don’t need CSS because <em>writing styles in JavaScript enables more architectural and community\nbenefits</em>.</li>\n</ul>\n<p>I’m excited about the large-scale adoption of modern JavaScript techniques and UI libraries,\nespecially React. But, I’m frustrated at the same time because those same codebases continue using\ndated, flawed CSS techniques and technologies instead of embracing modernity. It’s time we recognize\nthe importance of these new developments in the CSS community and find a way out of our old,\ncomfortable habits.</p>',frontmatter:{title:"The State of CSS",date:"May 25, 2017"}}},pathContext:{slug:"/the-state-of-css/",previous:{fields:{slug:"/conceptualizing-how-a-modern-single-page-app-is-served/"},frontmatter:{title:"Conceptualizing How a Modern Single Page App is Served"}},next:{fields:{slug:"/exposing-css-hidden-complexities-with-react/"},frontmatter:{title:"Exposing CSS Hidden Complexities with React"}}}}}});
//# sourceMappingURL=path---the-state-of-css-a0f0164281681b80835a.js.map