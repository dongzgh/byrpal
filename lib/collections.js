import {Mongo} from 'meteor/mongo';
 
export const Products = new Mongo.Collection('products');
export const Categories = new Mongo.Collection('categories');
export const Retailers = new Mongo.Collection('retailers');
export const Orders = new Mongo.Collection('orders');
export const Order = new Mongo.Collection('order');