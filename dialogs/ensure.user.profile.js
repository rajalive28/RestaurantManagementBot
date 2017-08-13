/**
@author Abhishek Raj
This dialog is meant to know about the user
**/
var builder = require('botbuilder');

module.exports=[
    function (session, args, next) {
        session.dialogData.profile = args || {}; // Set the profile or create the object.
        if (!session.dialogData.profile.name) {
            builder.Prompts.text(session, "Hi! Mate\nWhat's your name?");
        } else {
            // session.send('Hi %(name)s!', session.dialogData.profile);
             next(); // Skip if we already have this info.
        }
    },
    function (session, results, next) {
        if (results.response) {
            // Save user's name if we asked for it.
            session.dialogData.profile.name = results.response;
        }
        if (!session.dialogData.profile.crush) {
            session.send("Let's learn some thing about you");
            builder.Prompts.text(session, "What's your crush name");
        } else {
            // builder.Prompts.text('How is it goin on with %(crush)s !', session.dialogData.profile);
            next(); // Skip if we already have this info.
        }
    },
    function (session, results) {
        if (!session.dialogData.profile.crush) {
            // Save crush name if we asked for it.
            session.dialogData.profile.crush = results.response;
            session.endDialogWithResult({ response: session.dialogData.profile });
        }else{
          //session.send("haha");
          session.endDialogWithResult({ response: session.dialogData.profile });
        }

    }
]
