import { Config } from 'angular-ecmascript/module-helpers';

// Modules
import ProductsCtrl from './controllers/products';

// Templates
import tabsTemplateUrl from '../templates/tabs.html';
import productsTemplateUrl from '../templates/products.html';
import productTemplateUrl from '../templates/product.html';
import ordersTemplateUrl from '../templates/orders.html';
import orderTemplateUrl from '../templates/order.html';
import settingsTemplateUrl from '../templates/settings.html';

export default class RoutesConfig extends Config {
  configure() {
    this.$stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: tabsTemplateUrl
      })
      .state('tab.products', {
        url: '/products',
        views: {
          'tab-products': {
            templateUrl: productsTemplateUrl,
            controller: 'ProductsCtrl as productsCtrl'
          }
        }
      })
      .state('tab.product', {
        url: '/product',
        views: {
          'tab-product': {
            templateUrl: productTemplateUrl,
            controller: 'ProductCtrl as productCtrl'
          }
        }
      })
      .state('tab.orders', {
        url: '/orders',
        views: {
          'tab-orders': {
            templateUrl: ordersTemplateUrl,
            controller: 'OrdersCtrl as ordersCtrl'
          }
        }
      })
      .state('tab.order', {
        url: '/order',
        views: {
          'tab-order': {
            templateUrl: orderTemplateUrl,
            controller: 'OrderCtrl as orderCtrl'
          }
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: settingsTemplateUrl,
            controller: 'SettingsCtrl as settingsCtrl'
          }
        }
      });

    this.$urlRouterProvider.otherwise('tab/products');
  }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
