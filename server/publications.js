import { Meteor } from 'meteor/meteor';

// Data.
import { Products, Categories } from '../lib/collections';

if (Meteor.isServer) {
  Meteor.publish('products', function () {
    return Products.find({});
  });

  Meteor.publish('categories', function () {
    return Categories.find({});
  });
}