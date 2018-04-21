---
title: It's not magic, you just don't understand it yet
date: "2016-11-19T14:09:35.000Z"
---

<!-- prettier-ignore -->
**Dev 1**: "Wait, how did it do that?" <br/>
**Dev 2**: "I have not clue, it's Spring\* magic." <br/>
**Dev 1**: "Oh well, as long as it just works!"<br/>
\* _substitute Spring for any library or framework_

Every time I hear (or, admittedly, say) something like this, I cringe.

When we refer to code as magic, we perpetuate the mindset that some code is unaccessible. That we
don't need to know _how_ something works, only that is _does_ work. This is not the mindset of a
true craftsman. A craftsman seeks to understand the tools she uses, because she knows that she will
be able to use them more effectively, and will be more able to deal with inevitable failures.

<!-- more -->

Of course it is natural to think that something you have not yet understood is magic. Language
features such as Metaprogramming in Ruby or Java's Reflection API are advanced features that are
often called magical. However, under examination they can be understood and are usable, important
parts of those languages. If we write-off things we don't understand, or have not tried to
understand, as magic, we are doing ourselves a disservice.

A real consequence of this is the reflex to grab a library/plugin/framework for everything. Many
times the simplest and most flexible thing to do is implement something yourself. At some point you
may realize that you need a library to avoid having to maintain a lot of code yourself, and when
that happens, switch to it. But now you will have a good understanding of what it provides. Just the
other day I had a conversation with a couple developers on my team who were fixing the formatting of
currency values in our JavaScript app. They had found a library online for it. Instead, I encouraged
them to start with using `toFixed`, a native JavaScript method. Some day we may want the library,
but until then the devs know a simple way for formatting a JavaScript number using fixed-point
notation, and our app does not pull in yet another dependency.

Seek to understand how magic bits of code actually work. The easiest thing to do is to read the
docs! I'm constantly surprised at how many developers breeze over documentation, missing key
features. Take time to go through documentation, you'll likely find some great things in there that
you have not been doing.

Another way to understand is to imagine the simplest version of a library of framework. Take away
all the bells and whistles and get to the core of what the library does. How do you think it works
in its most basic form? Could you code a bare-bones version of it? Give it a shot! Don't worry about
"getting it right" or producing the most efficient, elegant solution. Just see if you can get
something working, even a little bit. This is one of the most powerful ways to reveal the magic ways
of a library or framework. You will likely be pleasantly surprised at the simplicity of your
solution. And, you will likely learn a thing or two along the way.

So, in the process of writing this post, I decided to do just that. I took a stab at implementing a
simple version of
[Spring's autowired](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Autowired.html)
dependency injection facility. I spent a few hours on it, and managed to learn a few things in the
process.

1. Detecting classes on the classpath is hard. I thought there was a simple Java API for doing this,
   but there does not seem to be. I ended up using some code I found online for this part so I
   wouldn't have to re-implement it myself.
1. I got a refresher in Java Reflection as my solution needed to be able to detect the presence of
   specific annotations, get constructor parameters, and dynamically construct objects.
1. The simplest solution I could do did all the dependency injection right away, though I'm not sure
   if Spring actually does it this way or not. I am assuming it takes a lazy approach, which could
   be more efficient for program start up. Spring may even allow you to configure the dependency
   injection as eager or lazy.

Here is my solution: <https://github.com/ryanoglesby08/spring-autowired-revealed>

Try to avoid using the term "magic" when talking about code. Remember, there is no magic. Just code.
