import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Logos = new Mongo.Collection('logos');

Meteor.methods({
  'logos.remove'(_id) {
  return  Logos.remove({ _id });
  },
  'logos.create'(code, active, name, keyword) {
    check(active, String);
    check(code, String);
    check(name, String);
    check(keyword, String);

    if (code.length <= 0) {
      throw new Meteor.Error(403, `'logos' should not be empty!`);
      return;
    }

   return Logos.insert({ code, active, name, keyword });
  },

  'logos.update'(_id, active, name, keyword) {
    check(active, String);
    check(name, String);
    check(keyword, String);
   return  Logos.update({ _id }, { $set: { active, name, keyword } });
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('logos', () => {
    return Logos.find();
  });

  Meteor.publish('logo', (_id) => {
    return Logos.find({ _id });
  });
}
