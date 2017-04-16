import {Mongo} from 'meteor/mongo';
 
export const Products = new Mongo.Collection('products');
export const Categories = new Mongo.Collection('categories');