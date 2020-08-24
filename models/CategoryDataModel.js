const mongoose = require('mongoose');

const categoryDataModelSchema = new mongoose.Schema({
  _id:           { type: String, default: '' },
  LastModified:  { type: Date, default: Date.now },
  Category:      { type: String, default: '' },
  Data:          { type: String, default: '' },
  Hash:          { type: String, default: '' }
});

module.exports = mongoose.model('CategoryDataModel', categoryDataModelSchema, 'CategoryDataModel');