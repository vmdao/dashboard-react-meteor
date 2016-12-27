import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const LogoTypes = new Mongo.Collection('logoTypes');

Meteor.methods({
  'logoTypes.remove'(_id) {
   return LogoTypes.remove({ _id });
  },
  'logoTypes.create'(code, active, name, keyword) {
    check(active, String);
    check(code, String);
    check(name, String);
    check(keyword, String);

    if (code.length <= 0) {
      throw new Meteor.Error(403, `'logoTypes' should not be empty!`);
      return;
    }

    return LogoTypes.insert({ code, active, name, keyword });
  },

  'logoTypes.update'(_id, active, name, keyword) {
    check(active, String);
    check(name, String);
    check(keyword, String);
   return LogoTypes.update({ _id }, { $set: { active, name, keyword } });
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('logoTypes', () => {
    return LogoTypes.find();
  });

  Meteor.publish('logoType', (_id) => {
    return LogoTypes.find({ _id });
  });
}
