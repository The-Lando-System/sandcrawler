const WebConsumerModel = require('../models/WebConsumerModel');
const constants = require('../constants');
const mongoose = require('mongoose');
const request = require('request');

module.exports = {

  findWebConsumer: function(callback) {
    if (constants.WEB_CONSUMER_ID === undefined) {
      console.log('Missing env variable: WEB_CONSUMER_ID');
      callback(null);
    }
  
    WebConsumerModel.findOne({ _id: constants.WEB_CONSUMER_ID }, (err, webConsumerModel) => {
      if (webConsumerModel === null) {
        console.log(`Failed to find model with id [${constants.WEB_CONSUMER_ID}]`);
        callback(null);
      } else {
        callback(webConsumerModel);
      }
    });
  },

  executeWebConsumerOnInterval: function(webConsumerModel, callback) {

    // Schedule the request at an interval
    return setInterval(() => {
      module.exports.executeWebConsumer(webConsumerModel, callback);
    },
    constants.REQUEST_INTERVAL);
  
  },

  executeWebConsumer: function(webConsumerModel, callback) {

    // Build the request
    var options = {
      url: webConsumerModel.Url,
      method: 'GET'
    };

    // Invoke the request
    request(options, function(error, response, body) {
      callback(body);
    });

  },

  connectToDatabase: function() {
    
    if (constants.WEB_CONSUMER_DB_CONNECTION === undefined) {
      console.log('Missing env variable: WEB_CONSUMER_DB_CONNECTION');
      return false;
    }

    mongoose.connect(constants.WEB_CONSUMER_DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, function(err) {
      if (err){
        console.log('ERROR! Could not connect to MongoDB!')
        if (err.message.includes('ECONNREFUSED')){
          console.log('The MongoDB connection was refused... Is your MongoDB running?');
          return false;
        }
      }
    });

    mongoose.Promise = global.Promise;

    return true;
  }
};