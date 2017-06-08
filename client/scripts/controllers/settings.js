// System.
import { Controller } from "angular-ecmascript/module-helpers";
import Moment from "moment";

// Controller definitions.
export default class SettingsCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);

    // Fields.    
    this.transportationFee = 0;
    this.firstPound = 0;
    this.restPound = 0;
    this.firstPoundWaveCondition = 0;
    this.priceUnit = "CAD$";
    this.package = 1;
    this.customTarif = 0.12;

    // Helpers.
    this.helpers({
    });
  };
}

// Declarations.
SettingsCtrl.$name = "SettingsCtrl";