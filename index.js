const express = require('express');
const constants = require('./constants');
const webConsumerUtils = require('./utils/web-consumer-utils');

const app = express();

app.listen(constants.PORT, () => {
  
  //webConsumerUtils.executeWebConsumer();
  app.get('/', function (req, res) {
    res.send('Sandcrawler is running!');
  })

  console.log('sandcrawler is up and running on port ', constants.PORT);
});