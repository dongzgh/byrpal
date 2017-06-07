// System.
import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';
import Moment from 'moment';

// Data.
import { Products, Orders, Order } from '../../../lib/collections';

// Controller definition.
export default class OrderCtrl extends Controller {
  // Constructor.
  constructor() {
    super(...arguments);
    let scope = this;

    // Subscriptions.    
    this.subscribe('products');
    this.subscribe('orders');
    this.subscribe('order');

    // Fields.
    this.client = 'Min';
    this.totalPrice = 0.0;

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

    // Listeners.
    this.$rootScope.$on('order.updateTotalPrice', function(){
      let items = Order.find({}).fetch();
      let quantity = items.length;
      scope.totalPrice = 0.0;
      items.forEach(function (item) {
        let product = Products.findOne({ _id: item.id });
        let unitPrice = 0;
        if (quantity === 1) {
          unitPrice = product.estimatedPrices[0];
        } else if (quantity === 2) {
          unitPrice = product.estimatedPrices[1];
        } else if (quantity === 3) {
          unitPrice = product.estimatedPrices[2];
        } else if (quantity >= 4) {
          unitPrice = product.estimatedPrices[3];
        }
        scope.totalPrice += unitPrice * item.quantity;
      });
    });
  };

  // Remove item.
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

  // Save order.
  save() {
    let items = Order.find({}).fetch();
    items.forEach(function (item) {
      delete item._id;
    });
    let item = {
      client: this.client,
      time: Moment().format('MMMM Do YYYY, h:mm:ss a'),
      items: items,
      totalPrice: this.totalPrice,
      status: "pending"
    };
    Orders.insert(item);
    Meteor.call('empty.order');
    this.totalPrice = 0.0;
  };
}

// Declaration.
OrderCtrl.$name = 'OrderCtrl';
OrderCtrl.$inject = ['$rootScope'];