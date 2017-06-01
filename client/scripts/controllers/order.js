import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Products, Order } from '../../../lib/collections';

export default class OrderCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);
    this.subscribe('products');
    this.subscribe('order');

    // Fields.    
    this.client = 'Tom';
    this.totalPrice = 0;

    // Helpers.
    this.helpers({
      items() {
        let items = Order.find({}).fetch();
        items.forEach(function (item) {
          let product = Products.findOne({ _id: item.id });
          item.picture = product.pictures[0];
          item.name = product.name;
        });
        return items;
      }
    });
  };

  remove(item) {
    if (item.quantity > 1) {
      Order.update(
        { _id: item._id },
        { $inc: { quantity: -1 } }
      );
    } else {
      Order.remove({ _id: item._id });
    }    
  };
}

OrderCtrl.$name = 'OrderCtrl';