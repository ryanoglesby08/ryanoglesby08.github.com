---
title: YAGNI a'int a Design Principle
date: "2016-02-12T13:21:24.000Z"
---

[You Ain’t Gonna Need It](http://c2.com/cgi/wiki?YouArentGonnaNeedIt) is an XP practice that
encourages developers to focus on the requirements at hand right now. It warns against the tendency
to over-engineer by developing features based on what you **think** you will need later. Easy in
theory. Hard in practice.

## YAGNI Blinders

I’ve noticed that developers, especially those just starting out, tend to apply YAGNI
narrow-sightedly. I often see it being strictly adhered to at face-value only, by developers always
choosing to do what seems to be the most obvious and straightforward thing at the time, without
putting any thought into the design implications of their choices. When suggesting other options
that seem to be less simple on the surface, they YAGNI argument gets used. “Oh, that’s YAGNI.”

<!-- more -->

YAGNI encourages simplicity. But many developers read simple as easy, which can lead to design
problems with their code that easily have been avoided. An easy solution doesn’t require any thought
or skill. A simple solution involves elegance, is purposeful, and is built with extensibility and
evolvability in mind. _(Rich Hickey, the creator of Clojure, gave a wonderful talk along these same
lines in 2011. [Simple Made Easy](http://www.infoq.com/presentations/Simple-Made-Easy))_

As an example of YAGNI Blinders, take internationalization (i18n) of a web-app. Usually, the first
requirement is to support only a single language, with support for other languages pretty far down
the line. A classic YAGNI solution here: hard coding everything in the HTML files. Done. (I’ll come
back to this soon….)

## See the Light!

The YAGNI argument breaks down because it does not take critical design characteristics such as
readability, flexibility, and loose coupling into account. A purely YAGNI-based solution does not
necessarily imply those things. By sticking to a YAGNI-only solution, you make it harder to quickly
move forward later, because extensive refactoring or rewriting would be needed first. By considering
simplicity along with many other design principles, you will end up with better factored code.

The most obvious choice is not always the right one. YAGNI does not mean to plow headfirst into the
first solution you think of. Good design trumps. But figuring out how to satisfy the requirements at
hand, while building a simple, flexible solution without gold-plating, over-engineering, or solving
for unknown future requirements is hard! Good. Glad our job isn’t boring. :)

Back to i18n, instead of hard coding all the strings in the HTML, we can introduce a simple lookup
mechanism. We store all our strings in a JSON file, and create a simple module that loads that file
into a map structure, so that strings can be looked up by a key.

Yes, this is not the absolute easiest solution. However, it is simple, and a better design. We have
better separation of concerns. We have pushed configuration (the strings) out of code, allowing them
to change independently as they may change at a different rate than the application code. We could
extend the lookup mechanism without changing the strings or keys. Event If we never get a
requirement to add another language, this is still a better design, and we did not have to build a
complex architecture involving locales, multiple languages, unicode character support, or any of the
other myriad of problems that come with i18n. Not easy, but simple.

> You always need good design. If you find yourself with a pair of YAGNI blinders on, ignoring
> design and code quality for purely YAGNI arguments, take a step back and remember that YAGNI ain’t
> a design principle.
