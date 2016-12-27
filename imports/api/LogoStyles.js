import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const LogoStyles = new Mongo.Collection('logoStyles');

Meteor.methods({
  'logoStyles.remove'(_id) {
   return LogoStyles.remove({ _id });
  },
  'logoStyles.create'(code, active, name, keyword) {
    check(active, String);
    check(code, String);
    check(name, String);
    check(keyword, String);

    if (code.length <= 0) {
      throw new Meteor.Error(403, `'logoStyles' should not be empty!`);
      return;
    }

   return LogoStyles.insert({ code, active, name, keyword });
  },

  'logoStyles.update'(_id, active, name, keyword) {
    check(active, String);
    check(name, String);
    check(keyword, String);
    return LogoStyles.update({ _id }, { $set: { active, name, keyword } });
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('logoStyles', () => {
    return LogoStyles.find();
  });

  Meteor.publish('logoStyle', (_id) => {
    return LogoStyles.find({ _id });
  });
}
