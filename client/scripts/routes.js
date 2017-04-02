import {Config} from 'angular-ecmascript/module-helpers';

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
            controller: 'ProductsCtrl as products'
          }
        }
      })
      .state('tab.product', {
        url: '/product',
        views: {
          'tab-product': {
            templateUrl: productTemplateUrl,            
            controller: 'ProductCtrl as product'
          }
        }
      });
 
    this.$urlRouterProvider.otherwise('tab/products');
  }
}
 
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
