// System.
import { Controller } from 'angular-ecmascript/module-helpers';
import Moment from 'moment';

// Data.
import { Categories, Retailers, Images } from '../../../lib/collections';

// Controller definition.
export default class ProductCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);
    let scope = this;

    // Subscriptions.
    this.subscribe('categories');
    this.subscribe('retailers');

    // Fields.    
    this.category = "supplement";
    this.name = "";
    this.weight = 0.0;
    this.retailer = "costco";
    this.unitPrice = 0.0;
    this.taxRate = "13%";
    this.profitValue = 10;
    this.profitModel = "percentage";
    this.retailPrices = [];
    this.pictures = [];

    // Helpers.
    this.helpers({
      categories() {
        return Categories.find({});
      },
      retailers() {
        return Retailers.find({});
      },
      uploader() {
        return new this.FileUploader({
          autoUpload: true,
          onSuccessItem: function (item, response, status, headers) {
            if (scope.pictures.indexOf(item.file.name) === -1) {
              scope.pictures.push(item.file.name);
              let reader = new FileReader();
              reader.onload = function (event) {
                var buffer = new Uint8Array(reader.result)
                Meteor.call('product.upload', item.file.name, buffer);
              }
              reader.readAsArrayBuffer(item._file);
            }
          }
        })
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

  // Estimate retail prices.
  estimate() {
    if (this.weight === 0) return;
    if (this.unitPrice === 0) return;
    this.retailPrices = [];
    let transportationFee = this.evalTransportationFee();
    for (let i = 0; i < 4; i++) {
      let quantity = i + 1;
      let expressFee = this.evalExpressFee(this.category, this.weight, quantity);
      let retailPrice = this.unitPrice * (parseFloat(this.taxRate) + 1.0) +
        expressFee / quantity + transportationFee / quantity;
      if (this.profitModel === "percentage")
        retailPrice = retailPrice * (this.profitValue + 100.0) / 100.0;
      else if (this.profitModel === "flat")
        retailPrice = retailPrice + this.profitValue;
      this.retailPrices.push(retailPrice);
    }
  };
}

// Declarations.
ProductCtrl.$name = 'ProductCtrl';
ProductCtrl.$inject = ['FileUploader'];