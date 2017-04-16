import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Categories, Retailers } from '../../../lib/collections';

export default class ProductCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('categories');
    this.subscribe('retailers');
    this.helpers({
      categories() {
        return Categories.find({});
      },
      retailers() {
        return Retailers.find({});
      }
    });
  }
}

ProductCtrl.$name = 'ProductCtrl';