---
title: Watching the Watchers in AngularJS
date: "2015-04-07T08:43:55.000Z"
layout: post
---

I have been doing quite a bit of AngularJS performance tweaking on my latest project. It is no
secret that Angular performance can quickly degrade due to the implementation of its
[digest cycle](https://docs.angularjs.org/guide/scope). I'll avoid Angular bashing here because this
is well-documented and blogged about to death (Google it). You're welcome.

Instead, I want to share a few learnings that I have picked up while attacking the performance
problems with having too many bindings and watchers in any Angular application.

<!-- more -->

## Should I even be worried?

The first step is actually knowing if you have a problem. Eventually, on my project, we could feel
the responsiveness of our application start to slip. Rendering seemed to slow down. Interactions
started to feel sluggish. You would click a toggle, it would wait a tick, and then change states.
Things like that. Even if you aren't noticing anything this drastic, its still a good idea to get
some insight and follow best practices though.

In order to help pinpoint the hotspots in your Angular app, I developed this
[Chrome extension](https://chrome.google.com/webstore/detail/angularjs-inspect-watcher/gdfcinoagafkodbnkjemaajfahnmfkhg)
to count how many watchers different sections of your app contain.

## [Bind once](https://docs.angularjs.org/guide/expression#one-time-binding) is your friend

This one is the easiest and has a big ROI. When using the normal binding syntax
`{{ <expression> }}`, Angular sets up a two-way binding so that the view can be automatically upated
when the underlying data changes. However, there are probably some static data in your app, which
makes the two-way binding both redundant and costly because Angular re-evaluates that expression
during every digest cycle to update your view with any changes. The bind once syntax eliminates
that. Quick win.

```
{{ ::item.name }}
```

_Note: only available in Angular 1.3 and later_

## Avoid excess use of ng-show/ng-hide

These directives are easy to abuse. When you have multiple elements that need to be hidden or shown
based on similar conditions, you can often combine multiple `ng-show/ng-hides` into a single
`ng-class` and sprinkle in some targetted CSS rules to achieve the same behavior with fewer
watchers.

So this, which contains 3 `ng-show/ng-hide` watchers...

```html
<div>
  <div>
    <span ng-hide="item.isSoldOut()">Price: $49.99</span>
    <span ng-show="item.isSoldOut()">Not in Stock</span>
  </div>
  <div>{{ ::item.name }}</div>
  <div ng-hide="item.isSoldOut()">
    Ships within 3-5 business days
  </div>
</div>
```

Can be turned into this, which contains 1 watcher - the `ng-class`:

```css item.css
.item .show-when-sold-out {
  display: none;
}

.item.sold-out .show-when-sold-out {
  display: block;
}
.item.sold-out .hide-when-sold-out {
  display: none;
}
```

```html
<div class="item" ng-class="{sold-out: item.isSoldOut()}">
  <div>
    <span class="hide-when-sold-out">Price: $49.99</span>
    <span class="show-when-sold-out">Not in Stock</span>
  </div>
  <div>{{ ::item.name }}</div>
  <div class="hide-when-sold-out">
    Ships within 3-5 business days
  </div>
</div>
```

## Beware the ng-repeat

A = How many watchers does each element of your `ng-repeat` contain?<br/> B = How many elements will
you be iterating over?

`if(A * B > 3000) { console.log("Houston we have a problem"); }`

On my current project, we were blindly using `ng-repeat` on elements that contained over 50 watchers
each. This was fine for some users who only had a few items in the list. But when we hit some users
who loaded over 400 elements into that list, (50 \* 400 = 20,000), our digest cycle slowed to a
crawl and we even crashed the browser sometimes. (Especially mobile browesers.) Oops.

Besides using the other tips listed on this page to reduce the overall number of watchers, my advice
is to think about the user experience of your app. Do you really need to render all those elements
in one big list? Enter pagination. Enter filtering and searching.

We went with a hand-rolled pagination solution because the available plugins didn't quite fit our
needs.

## Lazy evaluation of DOM elements

Take this example:

```html
<div class="item">
  <div class="item-header">
    <span>{{{ ::item.name }}</span><span ng-click="item.expand()">+</span>
  </div>
  <div class="item-info" ng-show="item.isExpanded()">
    <p>{{ item.description }}</p>
    <form ng-submit="item.addComment(comment)">
      <input type="text" ng-model="comment" />
      <input type="submit" />
    </form>
    <!-- More bindings and watchers -->
  </div>
</div>
```

Even though the elements in `div.item-info` are hidden, the watchers and bindings on those elements
will still be evaluated by Angular during the digest cycles. There is actually no point in compiling
and linking all the DOM elements in the hidden `div.item-info` section until the user actually
clicks the expansion trigger. We found that we could get a huge performance boost by taking
advantage of templates and changing the structure of our HTML a bit. So when the user clicks on the
expansion trigger, we grab the appropriate template, compile and link it with the data, and insert
that into the DOM!

```html
<div class="item">
  <div class="item-header">
    <span>{{ ::item.name }}</span><span ng-click="item.expand()">+</span>
  </div>
  <div class="item-info"></div>
</div>

<script type="text/ng-template" id="expandedItem.html">
  <p>{{ item.description }}</p>
  <form ng-submit="item.addComment(comment)">
    <input type="text" ng-model="comment" />
    <input type="submit" />
  </form>
  <!-- More bindings and watchers -->
</script>
```

The one caveat here is that once the user has expanded the item, all the watchers and bindings from
the expanded item are now part of the digest cycle. The more elements you expand, the more watchers
you end up with. This worked on my application because we expect the user to only expand a few
elements out of a long list - a big savings. If you expect the user to quickly show all the elements
you were initially hiding, this may not help much. In any case, it should at least help with initial
page load time because the `ng-templates` are not compiled until you explicity tell Angular to.

## Resources

I read a lot of blog articles and documentation while messing around with all of this. One that I
found particularly useful was [Ng Nuggets](http://ng.malsup.com/). Thanks!
