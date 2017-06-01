import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';

// Data.
import { Products, Orders, Order } from '../../../lib/collections';

export default class OrderCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);
    this.subscribe('products');
    this.subscribe('orders');
    this.subscribe('order');

    // Fields.    
    this.client = 'Min';
    this.totalPrice = 0.0;

    // Listeners.
    this.$rootScope.$on('order.updateTotalPrice', this.updateTotalPrice);

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

  updateTotalPrice() {
    let items = Order.find({}).fetch();
    this.totalPrice = 0.0;
    items.forEach(function (item) {
      let product = Products.findOne({ _id: item.id });
      let unitPrice = 0;
      if (item.quantity === 1) {
        unitPrice = product.estimatedPrices[0];
      } else if (item.quantity === 2) {
        unitPrice = product.estimatedPrices[1];
      } else if (item.quantity === 3) {
        unitPrice = product.estimatedPrices[2];
      } else if (item.quantity >= 4) {
        unitPrice = product.estimatedPrices[3];
      }
      this.totalPrice += unitPrice * item.quantity;
    });
  }

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

  save() {
    let items = Order.find({}).fetch();
    items.forEach(function (item) {
      delete item._id;
    });
    let item = {
      client: this.client,
      time: Moment().format(),
      items: items,
      status: "pending"
    };
    Orders.insert(item);
    Meteor.call('order.Empty');
  };
}

OrderCtrl.$name = 'OrderCtrl';
OrderCtrl.$inject = ['$rootScope'];