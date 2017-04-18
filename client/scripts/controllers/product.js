import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Categories, Retailers } from '../../../lib/collections';

export default class ProductCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);

    // Fields.
    this.subscribe('categories');
    this.subscribe('retailers');
    this.category = "supplement";
    this.name = "";
    this.weight = 0.0;
    this.retailer = "costco";
    this.unitPrice = 0.0;
    this.taxRate = "13%";
    this.profitValue = 10;
    this.profitModel = "percentage";
    this.retailPrices = [];

    // Helpers.
    this.helpers({
      categories() {
        return Categories.find({});
      },
      retailers() {
        return Retailers.find({});
      }
    });
  };

  // Estimate express fee.
  evalExpressFee(category, weight, quantity) {
    if (quantity === 1) // DONG: flat for now.
      return 18.99;
    else if (quantity == 2)
      return 16.99;
    else if (quantity === 3)
      return 14.99;
    else if (quantity >= 4)
      return 12.99;
  };

  // Estimate transortaion fee.
  evalTransportationFee() {
    return 2.0 // DONG: flat for now.
  };

  estimate() {
    if (this.weight === 0) return;
    if (this.unitPrice === 0) return;
    this.retailPrices = [];
    let transportationFee = this.evalTransportationFee();
    for (let i = 0; i < 4; i++) {
      let expressFee = this.evalExpressFee(this.category, this.weight, i + 1);
      let retailPrice = this.unitPrice * (parseFloat(this.taxRate) + 1.0) + transportationFee + expressFee;
      if (this.profitModel === "percentage")
        retailPrice = retailPrice * (this.profitValue + 100.0) / 100.0;
      else if (this.profitModel === "flat")
        retailPrice = retailPrice + this.profitValue;
      this.retailPrices.push(retailPrice);
    }
  };
}

ProductCtrl.$name = 'ProductCtrl';