const WebConsumerModel = require('../models/webConsumer');
const constants = require('../constants');
const mongoose = require('mongoose');
const request = require('request');

module.exports = {


  executeWebConsumer: function() {

    // Connect to DB
    if (constants.WEB_CONSUMER_DB_CONNECTION === undefined) {
      console.log('Missing env variable: WEB_CONSUMER_DB_CONNECTION');
      return;
    }

    mongoose.connect(constants.WEB_CONSUMER_DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, function(err) {
      if (err){
        console.log('ERROR! Could not connect to MongoDB!')
        if (err.message.includes('ECONNREFUSED')){
          console.log('The MongoDB connection was refused... Is your MongoDB running?');
          return;
        }
      }
    });

    mongoose.Promise = global.Promise;

    if (constants.WEB_CONSUMER_ID === undefined) {
      console.log('Missing env variable: WEB_CONSUMER_ID');
      return;
    }
  
    WebConsumerModel.findOne({ _id: constants.WEB_CONSUMER_ID }, (err, webConsumerModel) => {
      if (webConsumerModel === null) {
        console.log(`Failed to find model with id [${constants.WEB_CONSUMER_ID}]`);
        return;
      }
  
      console.log(webConsumerModel);
  
      setInterval(() => {
  
        console.log(`Executing request at ${(new Date()).toLocaleTimeString()}`);
  
        // Build the request
        var options = {
          url: webConsumerModel.Url,
          method: 'GET'
        };
  
        // Invoke the request
        request(options, function(error, response, body) {
          console.log(body);
        });
  
      },
      constants.REQUEST_INTERVAL);
  
    });
  }
};