'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const PORT = 8080;
const HOST = '0.0.0.0';
const TIMEOUT = 1500;

const app = express();

app.use(bodyParser.json({
  limit: '100k',
}));

app.get('/hello', function(req, res, next) {
  res.json({'msg': 'Hello from the Node API'})
});

app.get('/rec', function(req, response, next) {
  request('http://rules.service:8080', { json: true, timeout: TIMEOUT }, (err, res, body) => {
    if (err) {
      console.log(err);
      response.json({'err': err});
    }
    else {
      console.log('call returned from rules engine', body);
      response.json(body);
    }
  });
});

app.listen(PORT, HOST);

console.log('Listening on http://%s:%d', HOST || '*', PORT);

/**
 * Export the Express app so that it can be used by Chai
 */
module.exports = app;
