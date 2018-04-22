webpackJsonp([0xaf4a64208aac],{478:function(e,t){e.exports={data:{site:{siteMetadata:{title:"Ryan Oglesby"}},markdownRemark:{id:"/Users/ryanoglesby/Projects/blog/src/src/pages/its-not-magic-you-just-dont-understand-it-yet/index.md absPath of file >>> MarkdownRemark",html:'<!-- prettier-ignore -->\n<p><strong>Dev 1</strong>: “Wait, how did it do that?” <br/>\n<strong>Dev 2</strong>: “I have not clue, it’s Spring* magic.” <br/>\n<strong>Dev 1</strong>: “Oh well, as long as it just works!”<br/>\n* <em>substitute Spring for any library or framework</em></p>\n<p>Every time I hear (or, admittedly, say) something like this, I cringe.</p>\n<p>When we refer to code as magic, we perpetuate the mindset that some code is unaccessible. That we\ndon’t need to know <em>how</em> something works, only that is <em>does</em> work. This is not the mindset of a\ntrue craftsman. A craftsman seeks to understand the tools she uses, because she knows that she will\nbe able to use them more effectively, and will be more able to deal with inevitable failures.</p>\n<!-- more -->\n<p>Of course it is natural to think that something you have not yet understood is magic. Language\nfeatures such as Metaprogramming in Ruby or Java’s Reflection API are advanced features that are\noften called magical. However, under examination they can be understood and are usable, important\nparts of those languages. If we write-off things we don’t understand, or have not tried to\nunderstand, as magic, we are doing ourselves a disservice.</p>\n<p>A real consequence of this is the reflex to grab a library/plugin/framework for everything. Many\ntimes the simplest and most flexible thing to do is implement something yourself. At some point you\nmay realize that you need a library to avoid having to maintain a lot of code yourself, and when\nthat happens, switch to it. But now you will have a good understanding of what it provides. Just the\nother day I had a conversation with a couple developers on my team who were fixing the formatting of\ncurrency values in our JavaScript app. They had found a library online for it. Instead, I encouraged\nthem to start with using <code class="language-text">toFixed</code>, a native JavaScript method. Some day we may want the library,\nbut until then the devs know a simple way for formatting a JavaScript number using fixed-point\nnotation, and our app does not pull in yet another dependency.</p>\n<p>Seek to understand how magic bits of code actually work. The easiest thing to do is to read the\ndocs! I’m constantly surprised at how many developers breeze over documentation, missing key\nfeatures. Take time to go through documentation, you’ll likely find some great things in there that\nyou have not been doing.</p>\n<p>Another way to understand is to imagine the simplest version of a library of framework. Take away\nall the bells and whistles and get to the core of what the library does. How do you think it works\nin its most basic form? Could you code a bare-bones version of it? Give it a shot! Don’t worry about\n“getting it right” or producing the most efficient, elegant solution. Just see if you can get\nsomething working, even a little bit. This is one of the most powerful ways to reveal the magic ways\nof a library or framework. You will likely be pleasantly surprised at the simplicity of your\nsolution. And, you will likely learn a thing or two along the way.</p>\n<p>So, in the process of writing this post, I decided to do just that. I took a stab at implementing a\nsimple version of\n<a href="http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Autowired.html">Spring’s autowired</a>\ndependency injection facility. I spent a few hours on it, and managed to learn a few things in the\nprocess.</p>\n<ol>\n<li>Detecting classes on the classpath is hard. I thought there was a simple Java API for doing this,\nbut there does not seem to be. I ended up using some code I found online for this part so I\nwouldn’t have to re-implement it myself.</li>\n<li>I got a refresher in Java Reflection as my solution needed to be able to detect the presence of\nspecific annotations, get constructor parameters, and dynamically construct objects.</li>\n<li>The simplest solution I could do did all the dependency injection right away, though I’m not sure\nif Spring actually does it this way or not. I am assuming it takes a lazy approach, which could\nbe more efficient for program start up. Spring may even allow you to configure the dependency\ninjection as eager or lazy.</li>\n</ol>\n<p>Here is my solution: <a href="https://github.com/ryanoglesby08/spring-autowired-revealed">https://github.com/ryanoglesby08/spring-autowired-revealed</a></p>\n<p>Try to avoid using the term “magic” when talking about code. Remember, there is no magic. Just code.</p>',frontmatter:{title:"It's not magic, you just don't understand it yet",date:"November 19, 2016"}}},pathContext:{slug:"/its-not-magic-you-just-dont-understand-it-yet/",previous:{fields:{slug:"/on-injecting-a-javascript-environment/"},frontmatter:{title:"On Injecting a JavaScript Environment"}},next:{fields:{slug:"/an-exploration-of-javascript-builders/"},frontmatter:{title:"An Exploration of JavaScript Builders"}}}}}});
//# sourceMappingURL=path---its-not-magic-you-just-dont-understand-it-yet-df741f00e3e5606651c1.js.map