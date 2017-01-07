import { Meteor } from 'meteor/meteor';
import { ReactRouterSSR } from 'meteor/rubix:reactrouter:react-router-ssr';
import './setup-plugins';
import { LogoCategories } from '../imports/api/LogoCategories';
import { Payments } from '../imports/api/Payments';
import routes from '../imports/routes';

Meteor.startup(() => {
  // Do server-rendering only in production
  // Otherwise, it will break the hot-reload
  // DO NOT REMOVE THIS LINE. TO TEST run: "meteor --production" instead
  if (process.env.NODE_ENV === 'production') {
    console.log('--------------------RUN PRODUCTION--------------------')
    ReactRouterSSR.LoadWebpackStats(WebpackStats);

    ReactRouterSSR.Run(routes, {
      rootElement: 'app-container'
    });
  } else {
    console.log('--------------------RUN DEVELOPMENT--------------------')
  }

  if (Meteor.isServer) {
    Meteor.publish("userStatus", function () {
      return Meteor.users.find({ "status.online": true });
    });

    Meteor.publish("users", function () {
      return Meteor.users.find();
    });

    Meteor.publish("users.alalytics", function () {
      return VisitTracker.visits.find();
    });
    let stripeKey = Meteor.settings.private.stripe.testPublishableKey;
    let Stripe = StripeAPI(stripeKey);
    Meteor.methods({
      chargeCard: function (stripeToken) {
        let charge = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);
        return charge({
          amount: 500,
          currency: 'usd',
          source: stripeToken
        }, (err, charge) => {
          if (err && err.type === 'StripeCardError') {
            // The card has been declined
            throw new Meteor.Error("stripe-charge-error", err.message);
          }
          return Payments.insert({ code: charge.id, amount: charge.amount, active: 1, name: 'Payment Logo', description: JSON.stringify(charge) });
        });
      }
    });

  }
  WebApp.addHtmlAttributeHook(function () {
    return {
      "dir": "ltr",
      "class": "default"
    }
  });
});
