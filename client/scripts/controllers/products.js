import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProductsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('products');
    this.data = [];
  }

  remove(product) {
    this.data.splice(this.data.indexOf(product), 1);
  }
}

ProductsCtrl.$name = 'ProductsCtrl';