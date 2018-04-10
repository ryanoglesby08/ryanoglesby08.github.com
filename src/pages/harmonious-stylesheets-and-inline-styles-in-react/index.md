---
title: Harmonious Stylesheets and Inline Styles in React
date: "2016-10-15T14:28:00.000Z"
layout: post
---

Styling React components seems to be one of those things where there are a lot of solutions
([libraries](https://github.com/FormidableLabs/radium/blob/master/docs/comparison/README.md))
emerging that try to solve the problem of how to use _only_ inline styles in JavaScript sustainably.
To me, it seems that this problem has been invented and can easily be avoided; and introducing a new
library or tool is only adding to the complexity and cognitive overhead of your app. Many times it
really is just better to stick with plain ol CSS stylesheets.

Both traditional stylesheets and inline styles have their place within React applications. By using
them harmoniously you can have the best of both worlds.

<!-- more -->

## What is style anyway?

The first thing to realize is that "style" is actually a few related concepts. I like to break it
down into 2 main categories: presentational styles and behavioral styles.

**Presentational** styles describe the appearance of your application as a whole, and are rarely
specific to a particular component. Instead, presentational styles define how elements look in
relation to each other, and play the main role in the overall look-and-feel of the application. They
are also always static. Base font styles, the color palette, and your grid system are all examples
of presentational styling.

**Behavioral** styles describe how individual elements of your application look and behave in a
given state. They are dynamic, requiring logic to determine. For example, if an element changes
background colors when some state in the app is reached, then that is a behavioral style.

## Prefer traditional stylesheets for presentational styling

> For all the presentational styling needs of your application, stick with simple, traditional CSS
> stylesheets.

This will allow you to use modern CSS tools/languages such as [Sass](http://sass-lang.com) or
[LeSS](http://lesscss.org) and third party libraries such as [Bootstrap](http://getbootstrap.com/)
or [Bourbon](http://bourbon.io/).

Additionally, some CSS features such as media queries are at best painful and at worst impossible to
do with inline styles alone.

Finally, for teams with non-developers such as Designers contributing to the styles, there is a high
chance that they will be more comfortable and productive working with traditional stylesheets than
inlined CSS inside of JavaScript files.

```scss
// Example of some presentational styles (Sass)

html {
  font-family: $font-family;
  @include base-font;
}

.button {
  padding: $spacing;
  background-color: $light-blue;
  color: $gray;

  &:hover {
    background-color: $dark-blue;
  }
}
```

## Prefer inline styles for behavioral styling

> Because behavioral styles are determined by application state, which will be held in JavaScript,
> keep them co-located with the component as inline styles.

This makes conditional state classes totally unnecessary. No more "is-complete" or "has-ratings"
type of class names anymore.

Behavioral styles can and should be unit tested. This isn't perfect though, even though your
assertion that a particular style is applied passes, the component still may not render exactly the
way you want it in the browser.

Here is a working example of a `Nav` component whose behavior is to slide out from the left side of
the screen when opened. The dynamic state is `sliderMenuVisible`, which changes the `left` css
property, triggering an animation. Notice the use of the `nav` class name for presentational styling
concerns too.

```javascript
// Nav.js

let styles = {
  transition: 'left 0.5s',
}

const Nav = ({ sliderMenuVisible, toggleNavSliderMenu }) => {
  if (sliderMenuVisible) {
    styles = { ...styles, left: 0 }
  }

  return (
    <nav className="nav" style={styles}>
      <ul>
        <li>
          <Link to="/browse" onClick={toggleNavSliderMenu}>
            Browse
          </Link>
        </li>
        <li>
          <Link to="/orders" onClick={toggleNavSliderMenu}>
            Past Orders
          </Link>
        </li>
      </ul>
    </nav>
  )
}
```

## A Problem

The big problem here is that you cannot easily share code between CSS stylesheets and JavaScript
inline styles. If you have defined a Sass variable `$dark-red` and also want to use that same color
in a behavioral style, you would be forced to hard code the color value into the JavaScript too.

But, I have not seen this as a huge problem yet, and I don't think this would be a hard problem to
solve if it gets un-maintainable in your project.

## Further Reading

* <http://stackoverflow.com/questions/26882177/react-js-inline-style-best-practices>
* <https://css-tricks.com/the-debate-around-do-we-even-need-css-anymore/>
* <http://jamesknelson.com/why-you-shouldnt-style-with-javascript/>
