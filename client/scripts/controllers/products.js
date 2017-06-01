import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Products, Order } from '../../../lib/collections';

export default class ProductsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('products');
    this.subscribe('order');

    // Helpers.
    this.helpers({
      products() {
        return Products.find({});
      }
    });
  };

  order(product) {
    let item = Order.findOne({ id: product._id });
    if (item === undefined) {
      Order.insert({
        id: product._id,
        quantity: 1
      })
    } else {
      Order.update(
        { _id: item._id },
        { $inc: { quantity: 1 } }
      )
    }
    this.$rootScope.$broadcast('order.updateTotalPrice');
  };
}

ProductsCtrl.$name = 'ProductsCtrl';
ProductsCtrl.$inject = ['$rootScope'];