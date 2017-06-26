// System.
import Angular from "angular";
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
export default class OrdersCtrl extends Controller {
  // Constructor.
  constructor() {
    super(...arguments);
    let scope = this;

    // Subscriptions.
    this.subscribe("products");
    this.subscribe("orders");

    // Fields.
    this.state = "all";
    this.time = "all";

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
      filters() {
        return {
          "states": ["all", "imcomplete", "pending", "shopping", "sending", "completed"],
          "times": ["all", "this year", "this month", "this week", "today"]
        }
      },
      statuses() {
        return {
          "states": ["pending", "shopping", "sending", "completed"],
          "icons": ["ion-more", "ion-bag", "ion-paper-airplane", "ion-checkmark"]
        }
      }
    });

    // Listeners.
    this.$rootScope.$on("orders.final", function(){
      console.log("order final received.");
      this.orders.forEach(function(order){
        let qualify = true;
        order.items.forEach(function(item){
          if(item.status !== "completed") {
            qualify = false;
          }
        });
        if(qualify){
          let quote = 0.0;
          let realExpenses = 0.0;
          order.items.forEach(function(item){
            realExpenses += item.realUnitPrice * item.quantity + item.realTransFee;
          });
          realExpenses += order.realExprsFee;
          realProfit = realExpenses - order.totalPrice; 
          Orders.update({
            _id: order._id
          }, {
            $set: {
              realExpenses: realExpenses,
              realProfit: realProfit
            }
          })        
        }
      })
    });
  };

  // Filter state.
  setFilter(state, time) {
    if (state)
      this.state = state;
    if (time)
      this.time = time;
  };

  // Filter item.
  checkItem(order, item) {
    let checkState = false;
    if (this.state === "all") {
      checkState = true;
    } else {
      if (this.state === "imcomplete") {
        if (item.status === "pending" ||
          item.status === "shopping" ||
          item.status === "sending") {
          checkState = true;
        }
      } else if(this.state === item.status) {
        checkState = true;
      }
    };
    let checkTime = false;
    if (this.time === "all") {
      checkTime = true;
    } else {
      let orderTime = Moment(order.time, "MMMM DD YYYY, h:mm:ss a");
      let now = Moment();
      if ((this.time === "this year" && orderTime.year() === now.year()) ||
        (this.time === "this month" && orderTime.month() === now.month()) ||
        (this.time === "this week" && orderTime.week() === now.week()) ||
        (this.time === "today" && orderTime.day() === now.day())) {
        checkTime = true;
      }
    }
    return checkState && checkTime;
  };

  // Update status.
  updateStatus(order, item, state) {    
    item.status = state;
    let items = order.items;
    items.forEach(function(item){
      delete item.name;
      delete item.picture;
    })
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