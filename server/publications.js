import {
  Meteor
} from "meteor/meteor";

// Data.
import {
  Products,
  Orders,
  Order,
  Shopping
} from "../lib/collections";

// Publications.
if (Meteor.isServer) {
  Meteor.publish("products", function () {
    return Products.find({});
  });

  Meteor.publish("orders", function () {
    return Orders.find({});
  });

  Meteor.publish("order", function () {
    return Order.find({});
  });
}