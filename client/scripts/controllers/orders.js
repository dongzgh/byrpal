// System.
import Angular from 'angular';
import Moment from "moment";
import {
  Controller
} from "angular-ecmascript/module-helpers";

// Data.
import {
  Products,
  Orders,
  Shopping
} from "../../../lib/collections";

// Controller definition.
export default class OrdersCtrl extends Controller {
  // Constructor.
  constructor() {
    super(...arguments);
    let scope = this;

    // Subscriptions.
    this.subscribe("products");
    this.subscribe("orders");

    // Helpers.
    this.helpers({
      orders() {
        let orders = Orders.find({}).fetch();
        orders.forEach(function (order) {
          order.items.forEach(function (item) {
            let product = Products.findOne({
              _id: item.id
            });
            item.picture = product.pictures[0];
            item.name = product.name;
          })
        })
        return orders;
      },
      states() {
        return [{
            'name': 'pending',
            'icon': 'ion-more'
          },
          {
            'name': 'shopping',
            'icon': 'ion-bag'
          },
          {
            'name': 'sending',
            'icon': 'ion-paper-airplane'
          },
          {
            'name': 'completed',
            'icon': 'ion-checkmark'
          }
        ]
      }
    });
  };

  // Update status.
  updateStatus(order, item, state) {
    // - Update shopping collection.
    if (item.status !== "shopping" && state === "shopping") {
      let buy = Shopping.findOne({
        id: item.id
      });
      if (buy === undefined) {
        Shopping.insert({
          id: item.id,
          quantity: item.quantity
        })
      } else {
        Shopping.update({
          _id: buy._id
        }, {
          $inc: {
            quantity: item.quantity
          }
        })
      }
    } else if (item.status === "shopping" && state !== "shopping") {
      let buy = Shopping.findOne({
        id: item.id
      });
      Shopping.update({
        _id: buy._id
      }, {
        $inc: {
          quantity: -item.quantity
        }
      })
    }

    // - Update item status.
    item.status = state;
    Orders.update({
      _id: order._id
    }, {
      $set: {
        items: order.items
      }
    })
  };

  // Edit order.
  edit(order) {
    this.$state.go("tab.order", {
      reference: order
    });
    this.$rootScope.$broadcast("order.update", order);
  };

  // Remove order.
  remove(order) {
    Orders.remove({
      _id: order._id
    });
  };
}

// Declarations.
OrdersCtrl.$name = "OrdersCtrl";
OrdersCtrl.$inject = ["$rootScope", "$state"];