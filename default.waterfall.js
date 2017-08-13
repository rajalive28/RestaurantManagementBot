/**
@author Abhishek Raj
This is the default list of dialogs that will be invoked
**/

var builder = require('botbuilder');

module.exports= [
    function (session) {
        session.userData.profile={};
        session.beginDialog('ensureProfile', session.userData.profile);
    },
    function (session, results) {
        session.userData.profile = results.response; // Save user profile.
        builder.Prompts.text(session,'Hi '+session.userData.profile.name
         +' <br/> How is it goin on with '+session.userData.profile.crush +' !');
    },function(session,results){
        session.send("haha");
        session.beginDialog('restaurantBooking',session.userData.profile);
    }
]
