// System.
import {
  Controller
} from "angular-ecmascript/module-helpers";
import {
  Meteor
} from "meteor/meteor";
import Moment from "moment";

// Data.
import {
  Products,
  Orders,
  Order,
  Settings
} from "../../../lib/collections";

// Controller definition.
export default class OrderCtrl extends Controller {
  // Constructor.
  constructor() {
    super(...arguments);
    let scope = this;

    // Subscriptions.    
    this.subscribe("products");
    this.subscribe("orders");
    this.subscribe("order");
    this.subscribe("settings");

    // Fields.
    this.client = "Min";
    this.totalPrice = 0.0;
    this.reference = null;

    // Helpers.
    this.helpers({
      items() {
        let items = Order.find({}).fetch();
        items.forEach(function (item) {
          let product = Products.findOne({
            _id: item.id
          });
          item.picture = product.pictures[0];
          item.name = product.name;
        });
        this.totalPrice = this.evalTotalPrice(items);
        return items;
      }
    });

    // Initialization.
    if (this.$stateParams.reference !== null) {
      this.setData(this.$stateParams.reference);
    }

    // Listener
    // - Update order.
    this.$rootScope.$on("order.update", function (event, order) {
      scope.setData(order);
    });
  };

  // Evaluate toltal price.
  evalTotalPrice(items) {
    let quantity = 0;
    items.forEach(function (item) {
      quantity += item.quantity;
    });
    let totalPrice = 0.0;
    items.forEach(function (item) {
      let product = Products.findOne({
        _id: item.id
      });
      let unitPrice = 0;
      if (quantity === 1) {
        unitPrice = product.retailPrices[0];
      } else if (quantity === 2) {
        unitPrice = product.retailPrices[1];
      } else if (quantity === 3) {
        unitPrice = product.retailPrices[2];
      } else if (quantity >= 4) {
        unitPrice = product.retailPrices[3];
      }
      totalPrice += unitPrice * item.quantity;
    });
    return Number(totalPrice.toFixed(2));
  };

  // Load parameters.
  setData(order) {
    Meteor.call('empty.order');
    this.client = order.client;
    this.reference = order;
    order.items.forEach(function (item) {
      Order.insert({
        id: item.id,
        quantity: item.quantity
      });
    });
  };

  // Remove item.
  remove(item) {
    if (item.quantity > 1) {
      Order.update({
        _id: item._id
      }, {
        $inc: {
          quantity: -1
        }
      });
    } else {
      Order.remove({
        _id: item._id
      });
    }
  };

  // Save order.
  save() {
    if (this.totalPrice === 0) return;
    let items = Order.find({}).fetch();
    items.forEach(function (item) {
      delete item._id;
      delete item.name;
      delete item.picture;
      item.status = 'pending';
    });
    let item = {
      client: this.client,
      time: Moment().format("MMMM DD YYYY, h:mm:ss a"),
      items: items,
      totalPrice: this.totalPrice
    };
    Orders.insert(item);
    Meteor.call("empty.order");
    this.totalPrice = 0.0;
    this.$ionicScrollDelegate.scrollTop();
  };
}

// Declaration.
OrderCtrl.$name = "OrderCtrl";
OrderCtrl.$inject = ["$rootScope", "$stateParams", "$ionicScrollDelegate"];