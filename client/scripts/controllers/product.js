// System.
import { Controller } from 'angular-ecmascript/module-helpers';
import Moment from 'moment';

// Data.
import { Products } from '../../../lib/collections';

// Controller definition.
export default class ProductCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);
    let scope = this;

    // Subscriptions.    
    this.subscribe('products');

    // Fields.
    this.name = "";
    this.tags = "";
    this.pictures = [];
    this.description = "";
    this.weight = 0.0;
    this.unitPrice = 0.0;
    this.taxRate = "13%";
    this.profitValue = 10;
    this.profitModel = "ratio";
    this.exprsFirstPoundFee = 8.0;
    this.exprsRestPoundsFee = 5.0;
    this.exprsMinFee = 13.0;
    this.exprsWaiverMinPounds = 4.0;
    this.exprsWeightUnit = 0.5;
    this.exprsAdditionalFee = 0.0;
    this.transFlatRate = 4.0;
    this.transAdditionalFee = 0.0;
    this.retailPrices = [];

    // Helpers.
    this.helpers({
      uploader() {
        return new this.FileUploader({
          autoUpload: true,
          filters: [{
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
              var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
          }],
          onSuccessItem: function (item, response, status, headers) {
            let name = scope.generateImageName() + '.' + item.file.name.split('.').pop();
            scope.pictures.push(name);
            let reader = new FileReader();
            reader.onload = function (event) {
              let buffer = new Uint8Array(reader.result);
              Meteor.call('product.upload', name, buffer);
            }
            reader.readAsArrayBuffer(item._file);
          }
        })
      }
    });
  };

  generateImageName() {
    let length = 10;
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let name = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      name += charset.charAt(Math.floor(Math.random() * n));
    }
    return name;
  };

  evalExpressFee() {
    if (this.weight === 0.0) return;
    let scale = this.weight / this.exprsWeightUnit;
    let weight = round(scale) * this.exprsWeightUnit;
    let fee = 0.0;
    if (weight >= this.exprsWaiverMinPounds) {
      fee = this.exprsRestPoundsFee * weight;
    } else {
      fee = this.exprsFirstPoundFee * 1.0 + this.exprsRestPoundsFee * (weight - 1.0);
    }
    if (fee < this.exprsMinFee) {
      fee = this.exprsMinFee;
    }
    fee += this.exprsAdditionalFee;
    return fee;
  };

  evalTransportationFee() {
    let fee = this.transFlatRate; // DONG: flat for now.
    fee += this.transAdditionalFee;
    return fee;
  };

  // Estimate retail prices.
  evalRetailPrices() {
    if (this.weight === 0) return;
    if (this.unitPrice === 0) return;
    this.retailPrices = [];
    let exprsFee = evalExpressFee();
    let transFee = evalTransportationFee();
    for (let i = 0; i < 4; i++) {
      let quantity = i + 1;
      let retailPrice = this.unitPrice * (parseFloat(this.taxRate) / 100.0 + 1.0) + exprsFee / quantity + transFee / quantity;
      if (this.profitModel === "ratio")
        retailPrice = retailPrice * (this.profitValue / 100.0 + 1.0);
      else if (this.profitModel === "flat")
        retailPrice = retailPrice + this.profitValue;
      this.retailPrices.push(retailPrice);
    }
  };

  // Save to database.
}

// Declarations.
ProductCtrl.$name = 'ProductCtrl';
ProductCtrl.$inject = ['FileUploader'];