---
title: "How your 'Mother' can help you 'Build' cleaner unit tests - Part II"
date: "2016-06-25T14:20:26.000Z"
layout: post
---

In [Part I](/how-your-mother-can-help-you-build-cleaner-unit-tests/part-i), we created a separate
Builder class in an attempt to move away from a constructor with too many parameters. In the
process, the separate Builder ended up taking on the additional responsibility of supplying default
values, blurring the line between a Builder and Factory.

Though a step in the right direction, it didn't actually fix any of the `Address` constructor's
original problems, unfortunately. Oops. Other classes can still call it directly, meaning all of the
risks of having a method with multiple parameters of the same type are still there, and we have
another class in our system to maintain.

What we need is a strictly controlled way of creating `Address` objects that can be accessed by test
code _and_ prod code that is decoupled from the current constructor and it's baggage.

<!-- more -->

## 3) Pulling the Builder inside Address

Let's remodel the Builder as a static inner class within the `Address` class.

```java
public class Address {
  private final String lineOne;
  private final String lineTwo;
  private final String city;
  private final String state;

  private Address() {
    // Prevent other objects from calling the constructor
  }

  // ... other methods omitted for brevity

  public static final class Builder {
    private String lineOne;
    private String lineTwo;
    private String city;
    private String state;

    public Builder lineOne(String lineOne) {
      this.lineOne = lineOne;
      return this;
    }

    public Builder lineTwo(String lineTwo) {
      this.lineTwo = lineTwo;
      return this;
    }

    // ... city() and state() builder methods omitted for brevity

    public Address build() {
      return new Address(this);
    }
  }

  private Address(Builder builder) {
    this.lineOne = builder.lineOne;
    this.lineTwo = builder.lineTwo;
    this.city = builder.city;
    this.state = builder.state;
  }
}


public class ShippingServiceTest {
  private Address.Builder shippingAddressBuilder;

  @Before
  public void setUp() {
    shippingAddressBuilder = new Address.Builder()
      .lineOne("123 Main St.")
      .lineTwo("")
      .city("Chicago")
      .state("IL");
  }

  @Test
  public void shipsToTheAddress() {
    ShippingService service = new ShippingService();
    Address shippingAddress = shippingAddressBuilder.build();

    Shipment shipment = service.shipTo(shippingAddress);

    assertTrue(shipment.wasSuccessful());
    assertEquals(shipment.getDeliveryAddress(), shippingAddress);
  }

  @Test
  public void cannotShipToHawaii() {
    ShippingService service = new ShippingService();
    Address shippingAddress = shippingAddressBuilder.state("HI").build();

    Shipment shipment = service.shipTo(shippingAddress);

    assertFalse(shipment.wasSuccessful());
    assertEquals(shipment.getFailureReason(), "Cannot ship to Hawaii.");
  }
}
```

<table>
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
          We have coupled the Builder to the <code>Address</code> class more tightly, which is good. They must change together.
        </p>
        <p>
          Also, we have finally gotten rid of the public all-args constructor with too many parameters!
        </p>
        <p>
          To take it even further, we removed <em>all</em> public constructors. The <a href="http://www.javapractices.com/topic/TopicAction.do?Id=40">Private Constructor pattern</a> tells collaborators that object construction is internal and explicitly controlled by the class itself. The Builder is now the only way to construct an <code>Address</code>.
        </p>
      </td>
      <td>
        <p>
          However, the dual responsibilities of the separate Builder class have reared their ugly head. In order to prevent leaking test code (the default values) into our prod code (the inner Builder), we had to remove them altogether for now and go back to specifying them in the test class itself.
        </p>
        <p>
          This means we go back to the problem of confusing arbitrary values appearing in our tests.
        </p>
      </td>
    </tr>
  </tbody>
</table>

Next up, [Part III](/how-your-mother-can-help-you-build-cleaner-unit-tests/part-iii) - where we
truly divide the responsibilities for object construction into a Builder and a Factory, removing the
arbitrary default values from the test itself.
