import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Products } from '../../../lib/collections';

export default class ProductsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('products');
    this.helpers({
      products() {
        return Products.find({});
      }
    });
  }
}

ProductsCtrl.$name = 'ProductsCtrl';