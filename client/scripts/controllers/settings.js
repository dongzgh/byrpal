// System.
import {
  Controller
} from "angular-ecmascript/module-helpers";
import Moment from "moment";

// Data.
import {
  Settings
} from "../../../lib/collections";

// Controller definitions.
export default class SettingsCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);

    // Subscriptions.
    this.subscribe("settings");

    // Fields.    
    this.systemCurrency = "CAD";
    this.localCurrency = "CNY";
    this.conversionRate = 5.1716;
    this.taxRates = "0.13, 0.08, 0.05, 0.00";

    // Helpers.
    this.helpers({});
  };

  // Save.
  save() {
    let settings = Settings.findOne();
    let taxRates = this.taxRates.split(",").map(Number);
    if (settings) {
      Settings.upsert({
        _id: settings._id
      }, {
        $set: {
          systemCurrency: this.systemCurrency,
          localCurrency: this.localCurrency,
          conversionRate: this.conversionRate,
          taxRates: taxRates
        }
      });
    } else {
      Settings.insert({
        systemCurrency: this.systemCurrency,
        localCurrency: this.localCurrency,
        conversionRate: this.conversionRate,
        taxRates: taxRates
      });
    }
  };
}

// Declarations.
SettingsCtrl.$name = "SettingsCtrl";