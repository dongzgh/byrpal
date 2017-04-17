import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Orders } from '../../../lib/collections';

export default class OrdersCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('orders');
    this.helpers({
      orders() {
        return Orders.find({});
      }
    });
  }
}

OrdersCtrl.$name = 'OrdersCtrl';