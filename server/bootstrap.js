import { Meteor } from 'meteor/meteor';

// Data.
import { Order } from '../lib/collections';

// Startup.
Meteor.startup(function () {
  return Meteor.methods({
    "empty.order": function () {
      return Order.remove({});
    },

    'upload.image': function (name, buffer) {
      console.log('upload.image is called!');
      var fs = Npm.require('fs');
      let dir = 'assets/app/images';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      let path = dir + '/' + name;
      let file = Buffer.from(buffer);
      fs.writeFileSync(path, file, {encoding: null});
    }
  });
});