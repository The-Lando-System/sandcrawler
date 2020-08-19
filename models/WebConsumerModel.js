const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  _id:           { type: String, default: '' },
  LastModified:  { type: Date, default: Date.now },
  Name:          { type: String, default: '' },
  Url:           { type: String, default: '' },
  Method:        { type: String, default: 'GET' },
  RequestBody:   { type: String, default: '' },
  ContentType:   { type: String, default: '' },
  AuthType:      { type: String, default: 'None' },
  AuthUrl:       { type: String, default: '' },
  ApiKey:        { type: String, default: '' },
  ApiSecret:     { type: String, default: '' }
});

module.exports = mongoose.model('WebConsumer', requestSchema, 'Request');