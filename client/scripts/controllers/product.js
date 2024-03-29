// System.
import {
  Controller
} from "angular-ecmascript/module-helpers";
import Moment from "moment";
import Units from "mathjs";

// Data.
import {
  Products,
  Settings
} from "../../../lib/collections";

// Controller definition.
export default class ProductCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);
    let scope = this;

    // Subscriptions.    
    this.subscribe("products");
    this.subscribe("settings");

    // Fields.
    this.name = "";
    this.tags = "";
    this.pictures = [];
    this.description = "";
    this.weightUnits = [
      "kilogram", "gram", "pound", "ounce"
    ];
    this.weight = {
      unit: "gram",
      value: 0.0
    };
    this.unitPrice = 0.0;
    this.retailer = "";
    this.taxRate = "0.13";
    this.profitModels = [
      "ratio",
      "fixed"
    ];
    this.profit = {
      model: 'ratio',
      value: 10.0
    };
    this.exprsFirstPoundFee = 8.0;
    this.exprsRestPoundsFee = 5.0;
    this.exprsMinFee = 13.0;
    this.exprsWaiverMinPounds = 4.0;
    this.exprsWeightUnit = 0.5;
    this.transFlatRate = 4.0;
    this.additionalFee = 0.0;
    this.retailPrices = [];
    this.convertedPrices = [];

    // Helpers.
    this.helpers({
      uploader() {
        return new this.FileUploader({
          autoUpload: false,
          filters: [{
            name: "imageFilter",
            fn: function (item /*{File|FileLikeObject}*/ , options) {
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
      },
      settings() {
        let record = Settings.findOne();
        if(record) {
          this.taxRate = record.taxRates[0].toString();
        }
        return record;
      }
    });

    // Initialization.
    if (this.$stateParams.reference !== null) {
      this.setData(this.$stateParams.reference);
    }      

    // Listeners.
    // - Update product.
    this.$rootScope.$on("product.edit", function(event, product){
      scope.setData(product);
    });
  };

  // Load parameters.
  setData(product) {
    for (let property in product) {
      if (property.startsWith("$")) {
        continue;
      }
      if (property.startsWith("_")) {
        continue;
      };
      this[property] = product[property];
    }
  };

  // Clear pictures.
  clearPictures() {
    this.pictures = [];
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
    return fee;
  };

  // Estimate transportaion fee.
  evalTransportationFee() {
    let fee = this.transFlatRate; // DONG: flat for now.
    return fee;
  };

  // Estimate retail prices.
  evalRetailPrices() {
    if (this.weight === 0) return;
    if (this.unitPrice === 0) return;
    this.retailPrices = [];
    this.convertedPrices = [];
    let exprsFee = this.evalExpressFee();
    let transFee = this.evalTransportationFee();
    for (let i = 0; i < 4; i++) {
      let quantity = i + 1;
      let retailPrice = this.unitPrice * (parseFloat(this.taxRate) + 1.0) + exprsFee / quantity + transFee / quantity;
      if (this.profit.model === "ratio")
        retailPrice = retailPrice * (this.profit.value / 100.0 + 1.0);
      else if (this.profit.model === "flat")
        retailPrice = retailPrice + this.profit.value;
      this.retailPrices.push(Number(retailPrice.toFixed(2)));
      this.convertedPrices.push(Number(retailPrice.toFixed(2) * 5.1716));
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
    let product = Products.findOne({
      name: this.name
    });
    if (product === undefined) {
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
        transFlatRate: this.transFlatRate,
        additionalFee: this.addtionalFee,
        retailPrices: this.retailPrices,
        convertedPrices: this.convertedPrices
      });
    } else {
      Products.upsert({
        _id: product._id
      }, {
        $set: {
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
          transFlatRate: this.transFlatRate,
          additionalFee: this.addtionalFee,
          retailPrices: this.retailPrices,
          convertedPrices: this.convertedPrices
        }
      });
    }
    this.$ionicScrollDelegate.scrollTop();
  };
}

// Declarations.
ProductCtrl.$name = "ProductCtrl";
ProductCtrl.$inject = ["FileUploader", "$rootScope", "$stateParams", "$ionicScrollDelegate"];