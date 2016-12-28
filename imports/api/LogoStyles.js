import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const LogoStyles = new Mongo.Collection('logoStyles');

Meteor.methods({
  'logoStyles.remove'(_id) {
   return LogoStyles.remove({ _id });
  },
  'logoStyles.create'(data) {
    let {code} = data;
    if (code.length <= 0) {
      throw new Meteor.Error(403, `'logoStyles' should not be empty!`);
      return;
    }
   return LogoStyles.insert(data);
  },

  'logoStyles.update'(_id, data) {
    return LogoStyles.update({ _id }, { $set: data });
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
