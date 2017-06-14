import {
  Mongo
} from "meteor/mongo";

// Persistent collections.
export const Products = new Mongo.Collection("products");
export const Orders = new Mongo.Collection("orders");
export const Order = new Mongo.Collection("order");
export const Shopping = new Mongo.Collection("shopping");