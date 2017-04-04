import { Meteor } from 'meteor/meteor';
import { Products } from '../lib/collections';

if (Meteor.isServer) {
  Meteor.publish('products', function () {
    return Products.find({});
  });
}