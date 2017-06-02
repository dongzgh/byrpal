// System.
import { Controller } from 'angular-ecmascript/module-helpers';
import Moment from 'moment';

// Data.
import { Categories } from '../../../lib/collections';

// Class definitions.
export default class SettingsCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);

    // Subscriptions.
    this.subscribe('categories');

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
       categories() {
        return Categories.find({});
      }
    });
  };
}

// Declarations.
SettingsCtrl.$name = 'SettingsCtrl';