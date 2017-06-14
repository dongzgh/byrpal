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
export default class ShoppingCtrl extends Controller {
  // Constructor.
  constructor() {
    super(...arguments);

    // Subscriptions.
    this.subscribe("products");
    this.subscribe("orders");
    this.subscribe('shopping');

    // Helpers.
    this.helpers({
      items () {
        let items = Shopping.find({}).fetch();
        items.forEach(function(item){
          let product = Products.findOne({_id: item.id});
          item.name = product.name;
          item.picture = product.pictures[0];          
        });
        return items;
      }
    });
  };
}

// Declarations.
ShoppingCtrl.$name = "ShoppingCtrl";