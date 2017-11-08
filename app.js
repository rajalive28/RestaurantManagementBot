/**
@author Abhishek Raj
Dependencies to get you started
**/

var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot's connector class
var connector = new builder.ChatConnector({
  appId: "check",
  appPassword: "check"
});
/**This is the end point where the bot subscribes to

**/
server.post('/api/messages', connector.listen());

// Create the bot with the defaults
var defaults=require('./default.waterfall');
var bot = new builder.UniversalBot(connector,defaults);

/**
This property when set false will not persist user data
**/
// bot.set(`persistUserData`, false);

//=========================================================
// Bots Dialogs
//=========================================================

/**
Sample bot dialog to get you started!!
**/
// bot.dialog('/', function(session) {
//   session.send("Hello World !!!");
// });


//Dialog for ensuring about the user
var ensureProfile= require('./dialogs/ensure.user.profile');
bot.dialog('ensureProfile',ensureProfile );

//Dialog for room booking
var restaurantBooking= require('./dialogs/restaurant.booking');
bot.dialog('restaurantBooking',restaurantBooking)
.triggerAction({
    matches: /^book room|reserve a room|room booking$/i,
})
.reloadAction(
    "bookAgain", "Ok. Let's start over.",
    {
        matches: /^start over$|book again/i,
        confirmPrompt: "Your changes will be lost. Are you sure?"
    }
)
.cancelAction(
    "cancelOrder", "Booking Cancelled ! :(",
    {
        matches: /^cancel|cancel it$/i,
        confirmPrompt: "This will cancel your booking. Are you sure?"
    }
);
