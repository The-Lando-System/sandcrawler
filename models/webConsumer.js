const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  _id:           { type: String, default: '' },
  LastModified:  { type: Date, default: Date.now },
  Name:          { type: String, default: '' },
  Url:           { type: String, default: '' },
  Method:        { type: Number, default: 0 },
  RequestBody:   { type: String, default: '' },
  ContentType:   { type: String, default: '' },
  AuthType:      { type: Number, default: 0 },
  AuthUrl:       { type: String, default: '' },
  ApiKey:        { type: String, default: '' },
  ApiSecret:     { type: String, default: '' }
});

module.exports = mongoose.model('WebConsumer', requestSchema, 'Request');