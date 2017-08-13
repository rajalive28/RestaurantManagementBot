/**
@author Abhishek Raj
This dialog is meant to book room for the user
**/
var builder = require('botbuilder');
var request = require('request');
var config = require('../config.json')[process.env.NODE_ENV || 'local'];
const BASE_URI=config.BASE_URI


module.exports= [
    function (session, args, next) {
          session.dialogData.profile = args || {}; // Set the profile or create the object.
          builder.Prompts.confirm(session,'Yes '+ session.userData.profile.name+' ! you want me to book a room ?');
    },
    function (session, results, next) {
        if (results.response) {
            // Save user's room if we asked for it.
            builder.Prompts.text(session,'Provide me a room no of your choice!');
        }
    },function (session, results, next) {
            if (results.response) {
                session.dialogData.profile.room = results.response;
                var room =  session.dialogData.profile.room ;
                var name= session.userData.profile.name;
                if(!name){
                  name="you";
                }
                /**
                formulate the request body to hit the API
                **/
                console.log(BASE_URI);
                request.post({
                  url: BASE_URI+'/bookRoom',
                  json: {
                    exists: "IN",
                    name: name,
                    roomNo: Number(room)
                  }
                }, function(err, httpResponse, body) {
                    if(body.message=="success"){
                          session.send("Your Booking is done successfully !!")
                    }
                });
            }
        },
    function (session, results) {
        session.endDialog();
    }
]
