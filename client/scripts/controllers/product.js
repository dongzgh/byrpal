import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Categories } from '../../../lib/collections';

export default class ProductCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('categories');
    this.helpers({
      categories() {
        return Categories.find({});
      }
    });
  }
}

ProductCtrl.$name = 'ProductCtrl';