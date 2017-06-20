// System.
import Angular from 'angular';
import Moment from "moment";
import {
  Controller
} from "angular-ecmascript/module-helpers";

// Data.
import {
  Products,
  Orders
} from "../../../lib/collections";

// Controller definition.
export default class SendingCtrl extends Controller {
  // Constructor.
  constructor() {
    super(...arguments);

    // Subscriptions.
    this.subscribe("products");
    this.subscribe("orders");

    // Fields.
    this.allTransFee = 0.0;

    // Helpers.
    this.helpers({
      orders() {
      }
    });
  };

  // Save.
  save() {
  };
}

// Declarations.
SendingCtrl.$name = "SendingCtrl";