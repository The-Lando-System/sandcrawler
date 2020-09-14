const mongoose = require('mongoose');
const constants = require('../constants');

let dbConnections = {};

const connectToDb = function(dbName, connectionString) {

  let isConnected = true;

  var conn = mongoose.createConnection(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function(err) {
    if (err){
      console.log(`ERROR! Could not connect to MongoDB at URL [${connectionString}]`)
      if (err.message.includes('ECONNREFUSED')){
        console.log('The MongoDB connection was refused... Is your MongoDB running?');
      }
      isConnected = false;
    }
  });

  dbConnections[dbName] = conn;

  return isConnected;
}

if (!connectToDb('categorization-data', constants.RESULT_DB_CONNECTION)){
  process.exit(1);
}

if (!connectToDb('configs', constants.WEB_REQUEST_DB_CONNECTION)){
  process.exit(1);
}

module.exports = {
  getConnection : function(dbName) {
    return dbConnections[dbName];
  }
}