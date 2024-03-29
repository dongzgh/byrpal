// System.
import {
  Config
} from "angular-ecmascript/module-helpers";

// Modules
import ProductsCtrl from "./controllers/products";
import ProductCtrl from "./controllers/product";
import OrdersCtrl from "./controllers/orders";
import OrderCtrl from "./controllers/order";
import ShoppingCtrl from "./controllers/shopping";
import SendingCtrl from "./controllers/sending";
import SettingsCtrl from "./controllers/settings";

// Templates
import tabsTemplateUrl from "../templates/tabs.html";
import productsTemplateUrl from "../templates/products.html";
import productTemplateUrl from "../templates/product.html";
import ordersTemplateUrl from "../templates/orders.html";
import orderTemplateUrl from "../templates/order.html";
import shoppingTemplateUrl from "../templates/shopping.html";
import sendingTemplateUrl from "../templates/sending.html";
import settingsTemplateUrl from "../templates/settings.html";

// Config definition.
export default class RoutesConfig extends Config {
  configure() {
    this.$stateProvider
      .state("tab", {
        url: "/tab",
        abstract: true,
        templateUrl: tabsTemplateUrl
      })
      .state("tab.products", {
        url: "/products",
        views: {
          "tab-products": {
            templateUrl: productsTemplateUrl,
            controller: "ProductsCtrl as productsCtrl"
          }
        }
      })
      .state("tab.product", {
        url: "/product",
        views: {
          "tab-product": {
            templateUrl: productTemplateUrl,
            controller: "ProductCtrl as productCtrl"
          }
        },
        params: {
          reference: null
        }
      })
      .state("tab.orders", {
        url: "/orders",
        views: {
          "tab-orders": {
            templateUrl: ordersTemplateUrl,
            controller: "OrdersCtrl as ordersCtrl"
          }
        }
      })
      .state("tab.order", {
        url: "/order",
        views: {
          "tab-order": {
            templateUrl: orderTemplateUrl,
            controller: "OrderCtrl as orderCtrl"
          }
        },
        params: {
          reference: null
        }
      })
      .state("tab.shopping", {
        url: "/shopping",
        views: {
          "tab-shopping": {
            templateUrl: shoppingTemplateUrl,
            controller: "ShoppingCtrl as shoppingCtrl"
          }
        }
      })
      .state("tab.sending", {
        url: "/sending",
        views: {
          "tab-sending": {
            templateUrl: sendingTemplateUrl,
            controller: "SendingCtrl as sendingCtrl"
          }
        }
      })
      .state("tab.settings", {
        url: "/settings",
        views: {
          "tab-settings": {
            templateUrl: settingsTemplateUrl,
            controller: "SettingsCtrl as settingsCtrl"
          }
        }
      });

    this.$urlRouterProvider.otherwise("tab/products");
  }
}

// Declarations.
RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];