import { Config } from 'angular-ecmascript/module-helpers';

// Modules
import ProductsCtrl from './controllers/products';

// Templates
import tabsTemplateUrl from '../templates/tabs.html';
import productsTemplateUrl from '../templates/products.html';
import productTemplateUrl from '../templates/product.html';

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
      });

    this.$urlRouterProvider.otherwise('tab/products');
  }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
