const express = require('express');
const pjson = require('./package.json');
const constants = require('./constants');
const webConsumerUtils = require('./utils/web-consumer-utils');

const app = express();

if (!webConsumerUtils.connectToDatabase()) { return; }

let intervalHandle = undefined;

app.get('/', function (req, res) {
  webConsumerUtils.findWebConsumer((webConsumer) => {
    return res.status(200).send({
      'application' : `${pjson.name}-${pjson.version}`,
      'consumerId' : webConsumer._id,
      'consumerName' : webConsumer.Name,
      'consumerUrl' : webConsumer.Url,
      'consumerMethod' : webConsumer.Method,
      'consumerPostBody' : webConsumer.RequestBody,
      'consumerAuthType' : webConsumer.AuthType,
      'interval' : `${constants.REQUEST_INTERVAL}ms`,
      'isRunning' : intervalHandle ? true : false
    });
  });
});

app.post('/test', function(req, res) {
  webConsumerUtils.findWebConsumer((webConsumer) => {
    webConsumerUtils.executeWebConsumer(webConsumer, (responseBody) => {
      return res.status(200).send({
        "responseBody": responseBody
      });
    });
  });
});

app.post('/execute', function(req, res) {
  webConsumerUtils.findWebConsumer((webConsumer) => {
    if (intervalHandle) { clearInterval(intervalHandle); }
    intervalHandle = webConsumerUtils.executeWebConsumerOnInterval(webConsumer, (responseBody) => {
      // TODO - save response to models DB
      console.log(`Executed request at ${(new Date()).toLocaleTimeString()}`);
      console.log(responseBody);
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