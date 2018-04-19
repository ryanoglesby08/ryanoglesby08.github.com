---
title: An Exploration of JavaScript Builders
date: "2017-03-03T09:40:44.000Z"
---

Builders seems to be a popular topic for me, as I've
[blogged about the builder pattern before](/how-your-mother-can-help-you-build-cleaner-unit-tests/part-i).
This time, however, I look at builders through a JavaScript lens. In this post I'll explore three
techniques for modeling builders in JavaScript, specifically ES6, utilizing some of the interesting
features of the modern language.

_All the examples I show in this post show builders that are **only** for testing purposes. While
the builder pattern can be used in production code, the builders shown below are not appropriate for
production code because they contain pre-canned default values. Leave these in your test suite._

<!-- more -->

## The Classic

I start with a simple, recognizable builder that uses "withers" to build up the object's state.
Returning `this` from each "wither" enables chaining. The `build` method will return the final plain
JavaScript object.

```javascript
class ProductBuilder {
  constructor() {
    this.name = 'A Product'
    this.price = 9.99
    this.category = 'other'
  }

  withName(name) {
    this.name = name
    return this
  }

  withPrice(price) {
    this.price = price
    return this
  }

  withCategory(category) {
    this.category = category
    return this
  }

  build() {
    return {
      name: this.name,
      price: this.price,
      category: this.category,
    }
  }
}

console.log(
  new ProductBuilder()
    .withName('Harry Potter')
    .withCategory('book')
    .build()
)
// =>
//    {
//      name: 'Harry Potter',
//      price: 9.99,
//      category: 'book'
//    }
```

Simple. Familiar. But wordy. With only three fields our builder is already quite large, and needs a
lot of boilerplate. The size of the builder grows linearly with the number of fields.

While this technique is fine, it takes a very Java-esque approach, ignoring other powerful
JavaScript features. Let's investigate those.

## Generate Builders with Metaprogramming

Let's address some of the shortcomings of the previous example, namely the repetition of the
"withers." Rather than manually typing out each "wither" method, let's generate them automatically.

```javascript
class ProductBuilder {
  constructor() {
    this.name = 'A metaprogrammed product'
    this.price = 9.99
    this.category = 'other'

    // Generate "wither" methods for each property
    Object.keys(this).forEach(key => {
      const witherName = `with${key.substring(0, 1).toUpperCase()}${key.substring(1)}`
      this[witherName] = value => {
        this[key] = value
        return this
      }
    })
  }

  build() {
    // Get an array of all non-function properties of this builder
    const keysNoWithers = Object.keys(this).filter(key => typeof this[key] !== 'function')

    // Transform the array of keys into an object
    return keysNoWithers.reduce((returnValue, key) => {
      return {
        ...returnValue,
        [key]: this[key],
      }
    }, {})
  }
}

console.log(
  new ProductBuilder()
    .withName('Harry Potter')
    .withCategory('book')
    .build()
)
// =>
//    {
//      name: 'Harry Potter',
//      price: 9.99,
//      category: 'book'
//    }
```

This pattern produces an equivalent result as the first example. In the constructor, we
automatically generate all the "wither" methods from the properties of the object. Then, in the
`build` method, we use the properties of the object again to produce the resulting object. Some of
the cool JavaScript features we use are
[Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys),
[reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce),
and the proposed [object rest spread](https://github.com/sebmarkbage/ecmascript-rest-spread).

While at first this may seem overly complicated (for a single builder, yes, it is), the real power
is truly recognized when you have many builders. We can easily extract the generalized parts of this
into a common superclass, making it extremely easy to create new builders.

```javascript
class BaseBuilder {
  init() {
    Object.keys(this).forEach((key) => {
      const witherName = `with${key.substring(0,1).toUpperCase()}${key.substring(1)}`;
      this[witherName] = (value) => {
        this[key] = value;
        return this;
      };
    });
  }

  build() {
    const keysNoWithers = Object.keys(this).filter((key) => (
      typeof this[key] !== 'function'
    ));

    return keysNoWithers.reduce((returnValue, key) => {
      return {
        ...returnValue,
        [key]: this[key]
      };
    }, {});
  }
}

class ProductBuilder extends BaseBuilder {
  constructor() {
    super();

    this.name = 'A metaprogrammed product';
    this.price = 9.99;
    this.category = 'other';

    super.init();
  }
}

class SandwichBuilder extends BaseBuilder {
  constructor() {
    super();

    this.meat = 'ham';
    this.cheese = 'swiss';

    super.init();
  }
}


console.log(
  new ProductBuilder()
    .withName('Harry Potter')
    .withCategory('book')
    .build()
);
console.log(
  new SandwichBuilder()
    .withMeat('Roast Beef'
    .withCheese('Havarti')
    .build()
);
// =>
//    {
//      name: 'Harry Potter',
//      price: 9.99,
//      category: 'book'
//    }
// =>
//    {
//      name: 'Roast Beef',
//      cheese: 'Havarti'
//    }
```

By adopting this standard structure built on top of
[ES6 inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), we
benefit from the predictability of the common interface and from the simplicity in creating new
builders. Our builders are also still open for extension, as we can easily insert additional methods
to add custom functionality as needed.

But, we are still following the verbose "wither" syntax. This approach is inherently object
oriented. While there is nothing wrong with OOP, JavaScript is flexible and adopts multiple
paradigms. What if we approach builders using a more functional programming technique?

## Just Use Functions

Let's get rid of the classes. Let's get rid of the "withers". Let's model our builder as a function
instead.

```javascript
const buildProduct = (overrides = {}) => {
  const defaults = {
    name: 'A functional product',
    price: 9.99,
    category: 'other',
  }

  return { ...defaults, ...overrides }
}

console.log(
  buildProduct({
    name: 'Harry Potter',
    category: 'book',
  })
)
// =>
//    {
//      name: 'Harry Potter',
//      price: 9.99,
//      category: 'book'
//    }
```

That's it! Here, we rely heavily on the awesome object rest spread proposal to perform merging of
two objects.

While elegant, the most obvious deficiency is that there is no control over the contents of the
`overrides` object, which could lead to mistakes. In the above example, if I were to do
`buildProduct({nme: 'Harry Potter'})` I would end up with a product with the default name, _and_ an
additional property "nme." This is not ideal and could be frustrating at the least. Let's fix that.

```javascript
import { difference } from 'lodash';

const buildProduct = (overrides = {}) => {
  const defaults =
    name: 'A functional product',
    price: 9.99,
    category: 'other'
  };

  // Prevent extra keys from being introduced by the overrides
  const extraOverrides = difference(
    Object.keys(overrides),
    Object.keys(defaults)
  );
  if (extraOverrides.length > 0) {
    throw new Error(`Invalid builder! ${extraOverrides}`);
  }

  return {...defaults, ...overrides};
};

console.log(
  buildProduct({
    name: 'Harry Potter',
    category: 'book',
    keyThatDoesNotExist: 'oops'
  })
);
// => Error: Invalid builder! keyThatDoesNotExist
```

By using the [lodash library's array diffing utility](https://lodash.com/docs#difference), we can
prevent this problem. And, as with other bits of reusable code, we could extract this into a
function used by many builders.

In all of these examples the product object is a toy. With a larger, more complex object containing
multiple levels of nested objects, this functional technique could get out of control is not
properly modeled. While you could go for deep merging, I would shy away from that as it will hard to
reason about. Instead, I recommend composing many builders together.

```javascript
import { difference } from 'lodash'

const preventExtraOverrides = (defaults, overrides) => {
  const extraOverrides = difference(Object.keys(overrides), Object.keys(defaults))

  if (extraOverrides.length > 0) {
    throw new Error(`Invalid builder! ${extraOverrides}`)
  }
}

const buildProductName = (overrides = {}) => {
  const defaults = {
    name: 'A product',
    description: 'A product description',
  }

  preventExtraOverrides(defaults, overrides)

  return { ...defaults, ...overrides }
}

const buildProductPrice = (overrides = {}) => {
  const defaults = {
    price: 50,
    taxRate: 0.08,
  }

  preventExtraOverrides(defaults, overrides)

  return { ...defaults, ...overrides }
}

const buildProduct = (overrides = {}) => {
  const defaults = {
    name: buildProductName(),
    price: buildProductPrice(),
    category: 'other',
  }

  preventExtraOverrides(defaults, overrides)

  return { ...defaults, ...overrides }
}

console.log(
  buildProduct({
    name: buildProductName({ name: 'Harry Potter' }),
    price: buildProductPrice({ price: 9.99 }),
  })
)
// =>
//  {
//    name: {
//      name: 'Harry Potter',
//      description: 'A product description'
//    },
//    price: {
//      price: 9.99,
//      taxRate: 0.08
//    },
//    category: 'other'
//  }
```

By composing builders we can easily reason about our object because we have broken it down into
small, independent pieces. Each builder follows a similar pattern, but is self contained, which
allows for customization in specific situations when needed.

## So which one is best?

Well, it depends. Yep, not what you wanted to hear right? Of course it's never that easy. Your
unique situation may make some patterns more desirable than others. Are you on a team full of
ex-Java devs who are not used to JavaScript semantics yet? Maybe starting with the classic approach
and moving towards the metaprogramming technique eventually will suit you. Is your team ga-ga over
functional paradigms? Reach for the functional approach.

Overall, remember that JavaScript is a multi-paradigm language, capable of flexing to suit many
needs. Enjoy!
