const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const pjson = require('./package.json');
const constants = require('./constants');
const webRequestUtils = require('./utils/web-request-utils');
const resultHandler = require('./utils/result-handler');

const app = express();
app.use(cors());
app.use(logger('tiny'));

let intervalHandle = undefined;

app.get('/', function (req, res) {
  webRequestUtils.findWebRequest((webRequestModel) => {
    return res.status(200).send({
      'application' : `${pjson.name}-${pjson.version}`,
      'webRequestId' : webRequestModel._id,
      'webRequestName' : webRequestModel.Name,
      'webRequestUrl' : webRequestModel.Url,
      'webRequestMethod' : webRequestModel.Method,
      'webRequestPostBody' : webRequestModel.RequestBody,
      'webRequestAuthType' : webRequestModel.AuthType,
      'webRequestJsonPathCategory' : webRequestModel.JsonPathCategory,
      'webRequestJsonPathData' : webRequestModel.JsonPathData,
      'resultCollection' : constants.COLLECTION_NAME,
      'interval' : `${constants.REQUEST_INTERVAL}ms`,
      'saveDuplicates' : constants.SAVE_DUPLICATES,
      'isRunning' : intervalHandle ? true : false
    });
  });
});

app.post('/test', function(req, res) {
  webConsumerUtils.findWebConsumer((webConsumer) => {
    webConsumerUtils.executeWebConsumer(webConsumer, (result) => {
      return res.status(200).send(result);
    });
  });
});

app.post('/execute', function(req, res) {
  webRequestUtils.findWebRequest((webRequestModel) => {
    if (intervalHandle) { clearInterval(intervalHandle); }
    intervalHandle = webRequestUtils.executeWebRequestOnInterval(webRequestModel, (result) => {
      
      console.log(`Executed request at ${(new Date()).toLocaleTimeString()}`);
      
      if (constants.SAVE_DUPLICATES) {
        resultHandler.processResult(result);
      } else {
        resultHandler.processResultWithDupe(result);
      }

    });
    return res.status(200).send({
      'message' : 'Successfully started the sandcrawler'
    });
  });
});

app.post('/stop', function(req, res) {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = undefined;
  }
  return res.status(200).send({
    'message' : 'Successfully stopped the sandcrawler'
  });
});

app.listen(constants.PORT, () => {
  console.log('sandcrawler is up and running on port ', constants.PORT);
});