const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
const CategoryDataModel = require("../models/CategoryDataModel");
const constants = require('../constants');

module.exports = {

  processResultWithDupe : function(result) {

    if (module.exports.resultHasErrors(result)) { return; }

    const calcHash = md5(result.ParsedCategory+result.ParsedData);
    CategoryDataModel.find({ 'Hash' : calcHash }, (err, models) => {
      if (err) { console.log(err); return; }

      if (models.length > 0) { return; }

      module.exports.saveCategoryResult(result.ParsedCategory, result.ParsedData);
    });
  },

  processResult : function(result) {

    if (module.exports.resultHasErrors(result)) { return; }

    module.exports.saveCategoryResult(result.ParsedCategory, result.ParsedData);
  },

  saveCategoryResult : function(category, data) {
    
    const hash = md5(category+data);
    
    const categoryResult = {
      "_id" : uuidv4(),
      'Category' : category,
      'Data' : data,
      'LastModified' : new Date(),
      'Hash' : hash
    };

    CategoryDataModel.create(categoryResult, (err, savedResult) => {
      if (err) { console.log(err); return; }
      console.log(`Saved new entry in ${constants.COLLECTION_NAME} collection with hash [${savedResult.Hash}]`);
    });
  },

  resultHasErrors : function(result) {
    if (result && result.Status && result.Status !== 200) {
      console.log('Got a bad result from web request!');
      console.log(result);
      return true;
    }
    return false;
  }

}