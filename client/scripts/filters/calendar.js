// System.
import { Filter } from "angular-ecmascript/module-helpers";
import Moment from "moment";

// Filter definitions.
export default class CalendarFilter extends Filter {
  filter(time) {
    if (!time) return;
    return Moment(time).calendar(null, {
      lastDay: "[Yesterday]",
      sameDay: "LT",
      lastWeek: "dddd",
      sameElse: "DD/MM/YY"
    });
  }
}

// Declarations.
CalendarFilter.$name = "calendar";