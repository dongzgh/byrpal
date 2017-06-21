// System.
import Angular from 'angular';
import Moment from "moment";
import {
  Controller
} from "angular-ecmascript/module-helpers";

// Data.
import {
  Products,
  Orders
} from "../../../lib/collections";

// Controller definition.
export default class SendingCtrl extends Controller {
  // Constructor.
  constructor() {
    super(...arguments);

    // Subscriptions.
    this.subscribe("products");
    this.subscribe("orders");

    // Helpers.
    this.helpers({
      orders() {
        let rawOrders = Orders.find().fetch();
        // - Filter oders.
        let orders = [];
        rawOrders.forEach(function(rawOrder){
          for(let i = 0; i < rawOrder.items.length; i++) {
            if(rawOrder.items[i].status === "sending") {
              orders.push(rawOrder);
              break;
            }
          }
        });
        // - Filter items.
        orders.forEach(function(order){
          let items = [];
          for(let i = 0; i < order.items.length; i++) {
            if(order.items[i].status === "sending") {
              let item = order.items[i];
              let product = Products.findOne({_id: item.id});
              item.name = product.name
              item.picture = product.pictures[0];
              items.push(item);
            }
          }
          order.items = items;
        });
        return orders;
      }
    });
  };

  // Filter.
  filter(order) {
    order.items.forEach(function(item){
      if(item.status === "sending") {
        return true;
      }
    });
  }

  // Checker.
  checkItem(order, item) {
    if(item.status === "sending") {
      return true;
    }
    return false;
  };
  
  // Save.
  save() {
  };
}

// Declarations.
SendingCtrl.$name = "SendingCtrl";