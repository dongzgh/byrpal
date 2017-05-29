import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Products, Order } from '../../../lib/collections';

export default class ProductsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('products');
    this.subscribe('order');
    this.helpers({
      products() {
        return Products.find({});
      }
    });
  };

  order(product) {
    let item = Order.find({ "productId": product._id }).fetch();
    if (item.length === 0) {
      Order.insert({
        "productId": product._id,
        "name": product.name,
        "picture": product.pictures[0],
        "quantity": 1
      })
    } else {
      console.log("update record!")
    }
  }
}

ProductsCtrl.$name = 'ProductsCtrl';