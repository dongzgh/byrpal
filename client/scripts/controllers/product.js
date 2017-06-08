// System.
import { Controller } from "angular-ecmascript/module-helpers";
import Moment from "moment";
import Units from "mathjs";

// Data.
import { Products, Retailers } from "../../../lib/collections";

// Controller definition.
export default class ProductCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);
    let scope = this;

    // Subscriptions.    
    this.subscribe("products");
    this.subscribe("retailers");

    // Fields.
    this.name = "";
    this.tags = "";
    this.pictures = [];
    this.description = "";
    this.weight = { unit: "kg", value: 0.0 };
    this.unitPrice = 0.0;
    this.taxRate = "13%";
    this.retailer = "";
    this.profit = { model: 'ratio', value: 10.0 };
    this.exprsFirstPoundFee = 8.0;
    this.exprsRestPoundsFee = 5.0;
    this.exprsMinFee = 13.0;
    this.exprsWaiverMinPounds = 4.0;
    this.exprsWeightUnit = 0.5;
    this.exprsAdditionalFee = 0.0;
    this.transFlatRate = 4.0;
    this.transAdditionalFee = 0.0;
    this.retailPrices = [];
    if (this.$stateParams.reference !== null)
      this.loadStateParams(this.$stateParams.reference);

    // Helpers.
    this.helpers({
      uploader() {
        return new this.FileUploader({
          autoUpload: false,
          filters: [{
            name: "imageFilter",
            fn: function (item /*{File|FileLikeObject}*/, options) {
              var type = "|" + item.type.slice(item.type.lastIndexOf("/") + 1) + "|";
              return "|jpg|png|jpeg|bmp|gif|".indexOf(type) !== -1;
            }
          }],
          onAfterAddingAll: function (items) {
            items.forEach(function (item) {
              let reader = new FileReader();
              reader.onload = function (event) {
                scope.pictures.push(reader.result);
              }
              reader.readAsDataURL(item._file);
              item.upload();
            });
          }
        })
      }
    });
  };

  // Load parameters.
  loadStateParams(product) {
    for (let property in product) {
      if (property.startsWith("$")) { continue; }
      if (property.startsWith("_")) { continue; };
      this[property] = product[property];
    }
  };

  // Get random image name.
  generateImageName() {
    let length = 12;
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let name = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      name += charset.charAt(Math.floor(Math.random() * n));
    }
    return name;
  };

  // Estimate express fee.
  evalExpressFee() {
    if (this.weight.value === 0.0) return;

    // Reevaluate weight.
    let weight = Units.unit(this.weight.value, this.weight.unit);
    weight = weight.to('lbs').toNumber();
    let scale = weight / this.exprsWeightUnit;
    weight = Math.round(scale) * this.exprsWeightUnit;

    // Evaluate fee.
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

  // Estimate transportaion fee.
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
    let exprsFee = this.evalExpressFee();
    let transFee = this.evalTransportationFee();
    for (let i = 0; i < 4; i++) {
      let quantity = i + 1;
      let retailPrice = this.unitPrice * (parseFloat(this.taxRate) / 100.0 + 1.0) + exprsFee / quantity + transFee / quantity;
      if (this.profit.model === "ratio")
        retailPrice = retailPrice * (this.profit.value / 100.0 + 1.0);
      else if (this.profit.model === "flat")
        retailPrice = retailPrice + this.profit.value;
      this.retailPrices.push(retailPrice.toFixed(2));
    }
  };

  // Save to database.
  save() {
    // Check inputs.
    if (this.name === "") return;
    if (this.tag === "") return;
    if (this.pictures.length === 0) return;
    if (this.description === "") return;
    if (this.retailPrices.length === 0) return;
    if (Products.findOne({ name: this.name }) === undefined) {
      Products.insert({
        name: this.name,
        tags: this.tags,
        pictures: this.pictures,
        description: this.description,
        weight: this.weight,
        unitPrice: this.unitPrice,
        retailer: this.retailer,
        taxRate: this.taxRate,
        profit: this.profit,
        exprsFirstPound: this.exprsFirstPoundFee,
        exprsRestPound: this.exprsRestPoundFee,
        exprsMinFee: this.exprsMinFee,
        exprsWaiverMinPounds: this.exprsWaiverMinPounds,
        exprsWeightUnit: this.exprsWeightUnit,
        exprsAdditionalFee: this.exprsAdditionalFee,
        transFlatRate: this.transFlatRate,
        transAdditionalFee: this.transAdditionalFee,
        retailPrices: this.retailPrices
      });
    }
  };
}

// Declarations.
ProductCtrl.$name = "ProductCtrl";
ProductCtrl.$inject = ["FileUploader", "$rootScope", "$stateParams"];