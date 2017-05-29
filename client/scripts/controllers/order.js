import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Order } from '../../../lib/collections';

export default class OrderCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);

    // Fields.
    this.subscribe('order');
    this.client = 'Tom';
    this.totalPrice = 0;

    // Helpers.
    this.helpers({
      items(){
        return Order.find({});
      }
    });
  };
}

OrderCtrl.$name = 'OrderCtrl';