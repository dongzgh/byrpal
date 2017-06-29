// System.
import {
  Controller
} from "angular-ecmascript/module-helpers";
import Moment from "moment";

// Data.
import {
  Products,
  Order
} from "../../../lib/collections";

// Controller definition.
export default class ProductsCtrl extends Controller {
  // Constructor.
  constructor() {
    super(...arguments);

    // Subscriptions.
    this.subscribe("products");
    this.subscribe("order");

    // Fields.
    this.searchText = "";
    
    // Helpers.
    this.helpers({
      products() {
        return Products.find({}).fetch();
      }
    });
  };

  // Edit product.
  edit(product) {
    this.$state.go("tab.product", {
      reference: product
    });
    this.$rootScope.$broadcast("product.edit", product);
  };

  // Order product.
  order(product) {
    let item = Order.findOne({
      id: product._id
    });
    if (item === undefined) {
      Order.insert({
        id: product._id,
        quantity: 1
      })
    } else {
      Order.update({
        _id: item._id
      }, {
        $inc: {
          quantity: 1
        }
      })
    }
  };

  // Remove product.
  remove(product){
    Products.remove({
      _id: product._id
    })
  };
}

// Declarations.
ProductsCtrl.$name = "ProductsCtrl";
ProductsCtrl.$inject = ["$rootScope", "$state"];