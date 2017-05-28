import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';

// Data.
import { Categories, Retailers } from '../../../lib/collections';

export default class SettingsCtrl extends Controller {
  // Construction.
  constructor() {
    super(...arguments);

    // Fields.
    this.subscribe('categories');
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

SettingsCtrl.$name = 'SettingsCtrl';