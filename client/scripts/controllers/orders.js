import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Products, Orders } from '../../../lib/collections';

export default class OrdersCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('products');
    this.subscribe('orders');

    // Helpers.
    this.helpers({
      orders() {
        let orders = Orders.find({}).fetch();
        orders.forEach(function (order) {
          order.items.forEach(function (item) {
            let product = Products.find({ "_id": item.productId }).fetch();
            item.pictures = product[0].pictures;
          })
        })
        return orders;
      }
    });
  };
}

OrdersCtrl.$name = 'OrdersCtrl';