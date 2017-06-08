// System.
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
      }
    });
  };

  // Remove order.
  remove(order) {
    Orders.remove({_id: order._id});
  };
}

// Declarations.
OrdersCtrl.$name = "OrdersCtrl";