import {Mongo} from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('products', function productsPublication() {
    return Products.find();
  });
}