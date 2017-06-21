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
      articles() {
        let orders = Orders.find().fetch();
        // - Filter oders.
        let articles = [];
        orders.forEach(function (order) {
          for (let i = 0; i < order.items.length; i++) {
            if (order.items[i].status === "sending") {
              let article = order;
              article.realExprsFee = 0.0;
              articles.push(article);
              break;
            }
          }
        });
        // - Filter items.
        articles.forEach(function (article) {
          let items = [];
          for (let i = 0; i < article.items.length; i++) {
            if (article.items[i].status === "sending") {
              let item = article.items[i];
              let product = Products.findOne({
                _id: item.id
              });
              item.name = product.name
              item.picture = product.pictures[0];
              items.push(item);
            }
          }
          article.items = items;
        });
        return articles;
      }
    });
  };

  // Save.
  save() {
    this.articles.forEach(function (article) {
      article.items.forEach(function(item){
        delete item.name;
        delete item.picture;
        if(item.status === "sending") {
          item.status = "completed";
        }
      });
      Orders.update({
        _id: article._id
      }, {
        $set: {
          realExprsFee: article.realExprsFee,
          items: article.items
        }
      });
    })
    this.$rootScope.$broadcast("orders.final");
    this.$ionicScrollDelegate.scrollTop();
  };
}

// Declarations.
SendingCtrl.$name = "SendingCtrl";
SendingCtrl.$inject = ["$rootScope", "$ionicScrollDelegate"];