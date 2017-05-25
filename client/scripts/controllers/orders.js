import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Products, Orders } from '../../../lib/collections';

export default class OrdersCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('products');
    this.subscribe('orders');
    this.fullOrders = [];
    this.helpers({
      orders() {
        let dataOrders = Orders.find({}).fetch();
        dataOrders.forEach(function (dataOrder) {
          let dataProduct = Products.find({ "_id": dataOrder.productId }).fetch();
          dataOrder.pictures = dataProduct[0].pictures;
        })
        return dataOrders;
      }
    });
  }
}

OrdersCtrl.$name = 'OrdersCtrl';