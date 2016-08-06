---
layout: post
title: "How your 'Mother' can help you 'Build' cleaner unit tests - Part I"
date: 2016-06-23 13:34:08 -0500
comments: true
categories: ['java', 'testing', 'patterns']
---

Over the past few months on my project, a pattern emerged for using Builders and Object Mothers to build-up objects for unit testing. We were able to keep our tests minimal and clean, decouple test code from production code, and solve some design issues such as constructors with too many parameters. In this multi-part series, I will take you through the evolution of the pattern over a series of refactorings.

<!-- more -->

The Scenario:
---------------------
*Note: This is contrived for simplicity*

__The basics:__ We are building a system that schedules shipments of widgets to a specified address.

__The interesting bit:__ We have an `Address` class that we use quite often in our tests. By "use", I mean instantiate one with some valid data to either exercise it or assert against it.


1) Initial Code:
--------------------

``` java
public class Address {
  private final String lineOne;
  private final String lineTwo;
  private final String city;
  private String state;

  public Address(String lineOne, String lineTwo, String city, String state) {
    this.lineOne = lineOne;
    this.lineTwo = lineTwo;
    this.city = city;
    this.state = state;
  }

  public void setState(String state) {
    this.state = state;
  }

  // ... other methods omitted for brevity
}


public class ShippingServiceTest {
  private Address shippingAddress;

  @Before
  public void setUp() {
    shippingAddress = new Address("123 Main St", "", "Chicago", "IL");
  }

  @Test
  public void shipsToTheAddress() {
    ShippingService service = new ShippingService();

    Shipment shipment = service.shipTo(shippingAddress);

    assertTrue(shipment.wasSuccessful());
    assertEquals(shipment.getDeliveryAddress(), shippingAddress);
  }

  @Test
  public void cannotShipToHawaii() {
    ShippingService service = new ShippingService();
    shippingAddress.setState("HI");

    Shipment shipment = service.shipTo(shippingAddress);

    assertFalse(shipment.wasSuccessful());
    assertEquals(shipment.getFailureReason(), "Cannot ship to Hawaii.");
  }
}
```

The two hot spots here are the `Address` constructor and the customization of the `Address` fields in the tests.

Let's talk about the constructor:

1. __It has [too many parameters](http://c2.com/cgi/wiki?TooManyParameters)__ - four! (And you could imagine a real `Address` object having at least a couple more) And, multiple parameters in a row of the same type is even worse. If I accidentally swap `state` and `city` my program will still compile as both parameters are Strings, but it will probably fail at an unexpected time later.
2. __The arbitrary values used to construct the `Address` do not reveal intention.__ Why "123 Main St"? Why "IL"? Could I change that to be any state? Which values are effecting the outcome of each test and which are completely arbitrary?
3. __Optional parameters.__ `lineTwo` seems to be optional because of the empty String. Should we overload the constructor instead? Provide a setter?

And customizing the `Address` fields for each test:

1. __Prefer immutable state.__ The `setState` method makes `Address` mutable. Before that, we had a nice, happy immutable object, as you can see by the presence of the `final` keyword on the other instance fields.
<br/>
Because we were using the same `Address` object in many tests and we needed a different value for only one field, we added a setter instead of calling the constructor again. On the upside though, at least this test reveals its intention - that this test only cares about the `state` field.
2. __Keep test-only code out of production code.__ It's very likely that `setState` was added for this one test, and is not called by any production code. This is a smell that should be avoided.


2) Introducing a Builder
------------------------

First, we attempt to give `Address` it's immutability back and avoid adding telescoping constructors by introducing a [Builder](http://c2.com/cgi/wiki?BuilderPattern). The Builder allows us to separate the steps for constructing an object from the final representation of it.

``` java
public class Address {
  private final String lineOne;
  private final String lineTwo;
  private final String city;
  private final String state;

  public Address(String lineOne, String lineTwo, String city, String state) {
    this.lineOne = lineOne;
    this.lineTwo = lineTwo;
    this.city = city;
    this.state = state;
  }

  // ... other methods omitted for brevity
}


// Test only builder class
public class AddressBuilder {
  private String lineOne = "123 Main St";
  private String lineTwo = "";
  private String city = "Chicago";
  private String state = "IL";

  public AddressBuilder lineOne(String lineOne) {
    this.lineOne = lineOne;
    return this;
  }

  public AddressBuilder lineTwo(String lineTwo) {
    this.lineTwo = lineTwo;
    return this;
  }

  // ... other methods omitted for brevity

  public Address build() {
    return new Address(lineOne, lineTwo, city, state);
  }
}


public class ShippingServiceTest {
  private Address shippingAddress;

  @Before
  public void setUp() {
    shippingAddress = new AddressBuilder().build();
  }

  @Test
  public void shipsToTheAddress() {
    ShippingService service = new ShippingService();

    Shipment shipment = service.shipTo(shippingAddress);

    assertTrue(shipment.wasSuccessful());
    assertEquals(shipment.getDeliveryAddress(), shippingAddress);
  }

  @Test
  public void cannotShipToHawaii() {
    ShippingService service = new ShippingService();
    shippingAddress = new AddressBuilder().state("HI").build();

    Shipment shipment = service.shipTo(shippingAddress);

    assertFalse(shipment.wasSuccessful());
    assertEquals(shipment.getFailureReason(), "Cannot ship to Hawaii.");
  }
}
```

<table class="blog-table">
  <thead>
    <tr>
      <th>Looking good</th>
      <th>Needs improvement</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p>
          The Builder lets tests construct <code>Address</code> instances without invoking the public constructor, reducing the coupling to it.
        </p>
        <p>
          The addition of default values to the Builder pulls that arbitrary data out of the tests themselves, which further helps to highlight any tests that need a specific value, and without needing a setter.
        </p>
        <p>
          <code>Address</code> is immutable. :)
        </p>
      </td>
      <td>
        <p>
          This is yet another class to maintain.
        </p>
        <p>
          By making the Builder a separate object, we still need <code>Address</code>'s public all-args constructor. Any other test could easily bypass the builder. And, because the constructor is still there, all the problems from before remain.
        </p>
        <p>
          Additionally, our Builder actually has two responsibilities. First is <em>how</em> to construct the <code>Address</code>, as in, which parameters to pass into the constructor. Second, <em>what</em> to construct it with, because the Builder has default values.
        </p>
      </td>
    </tr>
  </tbody>
</table>


[Part II]({% post_url 2016-06-25-how-your-mother-can-help-you-build-cleaner-unit-tests-part-ii %}) will look at moving the Builder into a static inner class to fix the constructor with too many parameters issue.
