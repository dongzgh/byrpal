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
    this.priceUnit = "CAD$";
    this.conversionRate = 5.1716;

    // Helpers.
    this.helpers({});
  };

  // Save.
  save() {
    let settings = Settings.findOne();
    if (settings) {
      Settings.upsert({
        _id: settings._id
      }, {
        $set: {
          priceUnit: this.priceUnit,
          conversionRate: this.conversionRate
        }
      });
    } else {
      Settings.insert({
        priceUnit: this.priceUnit,
        conversionRate: this.conversionRate
      });
    }
  };
}

// Declarations.
SettingsCtrl.$name = "SettingsCtrl";