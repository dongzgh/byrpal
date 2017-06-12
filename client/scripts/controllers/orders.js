// System.
import Angular from 'angular';
import Moment from "moment";
import { Controller } from "angular-ecmascript/module-helpers";

// Data.
import { Products, Orders } from "../../../lib/collections";

// Controller definition.
export default class OrdersCtrl extends Controller {
  // Constructor.
  constructor() {
    super(...arguments);
    
    // Subscriptions.
    this.subscribe("products");
    this.subscribe("orders");

    // Helpers.
    this.helpers({
      orders() {
        let orders = Orders.find({}).fetch();
        orders.forEach(function (order) {
          order.items.forEach(function (item) {
            let product = Products.findOne({ _id: item.id });
            item.picture = product.pictures[0];
            item.name = product.name;
          })
        })
        return orders;
      },
      states() {
        return [
          {'name': 'pending', 'icon': 'ion-more'},
          {'name': 'shopping', 'icon': 'ion-bag'},
          {'name': 'sending', 'icon': 'ion-paper-airplane'},
          {'name': 'completed', 'icon': 'ion-checkmark'}
        ]
      }
    });
  };

  // Update status.
  updateStatus(order, item, state) {
    item.status = state;
    Orders.update({
      _id: order._id
    }, {
      $set: {
        items: order.items
      }
    })
  };

  // Remove order.
  remove(order) {
    Orders.remove({_id: order._id});
  };
}

// Declarations.
OrdersCtrl.$name = "OrdersCtrl";