/* This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/. */

'use strict';

var AlexaSkill = require('./AlexaSkill'),
    features = require('./features'),
    data = require('./data/data'), // data from caniuse.com
    createResponse = require('./createResponse');

var APP_ID = undefined; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var AlexaCanIUse = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
AlexaCanIUse.prototype = Object.create(AlexaSkill.prototype);
AlexaCanIUse.prototype.constructor = AlexaCanIUse;

AlexaCanIUse.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to the Can I Use for Alexa. You can ask about support for various browser features? ... Now, what can I help you with.";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

AlexaCanIUse.prototype.intentHandlers = {
    "CanIUseIntent": function (intent, session, response) {
        var featureSlot = intent.slots.Feature,
            featureName;
        if (featureSlot && featureSlot.value){
            featureName = intent.slots.Feature.value.toString().toLowerCase();
        }
        else { /* added this for debugging purposes, remove later */
            featureName = "failed";
        }

        var cardTitle = "Can I use " + featureName,
            feature = features[featureName],
            featureResponse,
            speechOutput,
            repromptOutput;
        if (feature == undefined) {
            featureResponse = "I'm sorry, I currently do not know the feature for " + featureName + ".";
        }
        else {
            featureResponse = createResponse(data,data.data[feature]);
        }
        speechOutput = {
            speech: featureResponse,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.tellWithCard(speechOutput, cardTitle, feature);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions about browser features such as, can I use drag and drop, or, you can say exit... Now, what can I help you with?";
        var repromptText = "You can say things like, can I use drag and drop, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var alexaCanIUse = new AlexaCanIUse();
    alexaCanIUse.execute(event, context);
};