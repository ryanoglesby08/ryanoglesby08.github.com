---
title: "How your 'Mother' can help you 'Build' cleaner unit tests - Part III"
date: "2016-06-26T21:28:58.000Z"
layout: post
---

We ended [Part II](/how-your-mother-can-help-you-build-cleaner-unit-tests/part-ii) with an inner
Builder for `Address`, which forced us to revert to specifying seemingly arbitrary values in each
test that needed to build an `Address`.

What I've usually seen at this point is pulling the Address objects into constants in each test
class. As the test suite grows, the number of `private static final Address WHATEVER_ADDRESS = ...;`
grows and grows. Doing that makes it hard to keep control over your test data, especially in a large
codebase. A minor change to Address, such as a new invariant or an added field, could cause
cascading changes to keep all those objects valid.

To avoid that, the next step is actually a very simple one, and boils down to centralizing the
definition and creation of an `Address` with an Object Mother.

<!-- more -->

## 4) Introducing an Object Mother

An [Object Mother](http://martinfowler.com/bliki/ObjectMother.html) is a type of Factory used to
create example objects for testing. Let's see it in action:

```java
public class Address {
  // ... no change, still using inner Builder
}


// Test only class
public class AddressMother {
  public static Address.Builder address() {
    return new Address.Builder()
      .lineOne("123 Main St.")
      .lineTwo("")
      .city("Chicago")
      .state("IL");
  }

  public static Address.Builder hawaiianAddress() {
    return new Address.Builder()
      .lineOne("123 Hawaii St.")
      .lineTwo("")
      .city("Honolulu")
      .state("HI");
  }
}


import static AddressMother.address;

public class ShippingServiceTest {
  @Test
  public void shipsToTheAddress() {
    ShippingService service = new ShippingService();
    Address shippingAddress = address().build();

    Shipment shipment = service.shipTo(shippingAddress);

    assertTrue(shipment.wasSuccessful());
    assertEquals(shipment.getDeliveryAddress(), shippingAddress);
  }

  @Test
  public void cannotShipToHawaii() {
    ShippingService service = new ShippingService();

    Shipment shipment = service.shipTo(hawaiianAddress().build());

    assertFalse(shipment.wasSuccessful());
    assertEquals(shipment.getFailureReason(), "Cannot ship to Hawaii.");
  }
}
```

The Mother controls the values that constitute an example `Address`. Now, when a test needs an
`Address` it asks the Mother for one. Your Mother could return fully initialized `Address` objects,
but instead we have chosen to have it return Builders. This powerful variation allows a test to get
a basic example object, and then modify it depending on what it is testing.

Give your Mother class the ability to build objects with various states as appropriate. In our case,
we currently have the need for a basic, valid address, and a Hawaiian address. But, be wary of
creating a different factory method for every example object you need. That may be a bit overkill.
I'd say to only create factory methods for things that represent core use cases and not one for each
edge case that you test. For example, if I wanted to test what happens when `state` is empty, I'd do
`address().state("").build()` over creating an `addresWithoutAState()` factory method in the Mother.

## The End

Whew, that's it! Thanks for making it this far. If you skipped Parts
[I](/how-your-mother-can-help-you-build-cleaner-unit-tests/part-i) or
[II](/how-your-mother-can-help-you-build-cleaner-unit-tests/part-ii), I'd recommend going back to
see the entire journey. We teased out a nice pattern for managing test data using the Builder
pattern + Object Mothers. In doing so, we improved the design of our production code by making
`Address` immutable and avoiding a sketchy constructor with a lot of parameters.
