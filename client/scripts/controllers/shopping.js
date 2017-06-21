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
export default class ShoppingCtrl extends Controller {
  // Constructor.
  constructor() {
    super(...arguments);

    // Subscriptions.
    this.subscribe("products");
    this.subscribe("orders");

    // Fields.
    this.allTransFee = 0.0;

    // Helpers.
    this.helpers({
      articles() {
        let articles = [];
        let orders = Orders.find({}).fetch();
        orders.forEach(function (order) {
          let items = order.items;
          items.forEach(function (item) {
            if (item.status === "shopping") {
              let article = undefined;
              articles.forEach(function (obj) {
                if (obj.id === item.id) {
                  article = obj;
                }
              });
              if (article) {
                article.quantity += item.quantity;
                article.totalPrice = Number((article.quantity * article.retailPrice).toFixed(2));
              } else {
                let product = Products.findOne({
                  _id: item.id
                });
                article = {};
                article.id = product._id;
                article.name = product.name;
                article.quantity = item.quantity;
                article.picture = product.pictures[0];
                article.retailer = product.retailer;
                article.retailPrice = product.retailPrices[3];
                article.totalPrice = Number((article.quantity * article.retailPrice).toFixed(2));
                article.comment = "";
                articles.push(article);
              }
            }
          });
        });
        return articles;
      }
    });
  };

  // Save.
  save() {
    let count = 0;
    this.articles.forEach(function(article){
      count += article.quantity;
    });
    let unitTransFee = this.allTransFee / count;
    let orders = Orders.find({}).fetch();
    this.articles.forEach(function (article) {
      orders.forEach(function (order) {
        let items = order.items;
        let update = false;
        items.forEach(function (item) {
          if (item.status === "shopping" && item.id === article.id){
            item.status = "sending";
            item.realTransFee = unitTransFee; 
            item.realRetailPrice = article.retailPrice;
            update = true;
          }
        });
        if(update){
          Orders.update({
            _id: order._id
          }, {
            $set: {
              items: order.items
            }
          });
        }
      });
    });
    this.$ionicScrollDelegate.scrollTop();
  };  
}

// Declarations.
ShoppingCtrl.$name = "ShoppingCtrl";
ShoppingCtrl.$inject = ["$ionicScrollDelegate"];