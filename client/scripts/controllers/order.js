import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Categories, Retailers } from '../../../lib/collections';

export default class OrderCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);

    // Fields.
    this.client = "Tom";
    this.name = "Jamieson Kids Chewable Vitamin D 400 IU Strawberry Tablets";
    this.quantity = 1;
    this.totalPrice = 0;
    this.realUnitPrice = 0;
    this.realTransportationFee = 0;
    this.realExpressFee = 0;
    this.status = "pending";

    // Helpers.
    this.helpers({
    });
  };
}

OrderCtrl.$name = 'OrderCtrl';