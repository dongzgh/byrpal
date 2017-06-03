import { Meteor } from 'meteor/meteor';

// Data.
import { Order } from '../lib/collections';

// Startup.
Meteor.startup(function () {
  return Meteor.methods({
    "order.Empty": function () {
      return Order.remove({});
    },

    'product.upload': function (name, buffer) {
      var fs = Npm.require('fs');
      let dir = './uploaded';
      if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      let path = dir + '/' + name;
      let file = new Buffer(buffer);      
      fs.writeFileSync(path, file);
    }
  });
});