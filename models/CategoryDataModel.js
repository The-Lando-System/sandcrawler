const mongoose = require('mongoose');
const constants = require('../constants');
const dbUtils = require('../utils/db-utils');

const categoryDataModelSchema = new mongoose.Schema({
  _id:           { type: String, default: '' },
  LastModified:  { type: Date, default: Date.now },
  Category:      { type: String, default: '' },
  Data:          { type: String, default: '' },
  Hash:          { type: String, default: '' }
});

module.exports = dbUtils.getConnection('categorization-data').model('CategoryDataModel', categoryDataModelSchema, constants.COLLECTION_NAME);