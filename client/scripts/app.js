// System.
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import 'ionic-scripts';

// Modules
import ProductsCtrl from './controllers/products';
import ProductCtrl from './controllers/product';
import OrdersCtrl from './controllers/orders';
import OrderCtrl from './controllers/order';
import SettingsCtrl from './controllers/settings';
import CalendarFilter from './filters/calendar';
import RoutesConfig from './routes';

// App
const App = 'ShopAgent';
Angular.module(App, [
  'angular-meteor',
  'ionic'
]);

new Loader(App)
  .load(ProductsCtrl)
  .load(ProductCtrl)
  .load(OrdersCtrl)
  .load(OrderCtrl)
  .load(SettingsCtrl)
  .load(CalendarFilter)
  .load(RoutesConfig);

// Startup
if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}
else {
  Angular.element(document).ready(onReady);
}

function onReady() {
  Angular.bootstrap(document, [App]);
}