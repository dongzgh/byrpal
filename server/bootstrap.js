import { Meteor } from 'meteor/meteor';

// Data.
import { Order } from '../lib/collections';

Meteor.startup(function () {
  return Meteor.methods({
      "order.Empty": function () {
        return Order.remove({});
      }
    });
});