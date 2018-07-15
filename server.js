'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');

const PORT = 8080;
const RULES_ADDR = 'http://localhost';
const RULES_PORT = 8000;
const HOST = '0.0.0.0';
const TIMEOUT = 1500;

const app = express();

let rulesApi = {
  passingRule: function(payload) {
    return request({
      "method":"GET",
      "uri": `${RULES_ADDR}:${RULES_PORT}/rule/600`,
      "json": true,
      "timeout": TIMEOUT,
    }).then(body => {
      payload.passing = body
      return payload
    });
  },
  blockingRule: function(payload) {
    return request({
      "method":"GET",
      "uri": `${RULES_ADDR}:${RULES_PORT}/rule/400`,
      "json": true,
      "timeout": TIMEOUT,
    }).then(body => {
      payload.blocking = body
      return payload
    });
  },
  healthCheck: function() {
    return request({
      "method":"GET",
      "uri": `${RULES_ADDR}:${RULES_PORT}`,
      "json": true,
      "timeout": TIMEOUT,
    });
  }
}

app.get('/hello', function(req, res, next) {
  res.json({'msg': 'Hello from the Node API'})
});

app.get('/health', function(req, response, next) {
  rulesApi
    .healthCheck()
    .then(body => response.json(body))
    .catch(err => response.json({'err': err}))
});

app.get('/rules', function(req, response, next) {
  rulesApi
    .passingRule({})
    .then(rulesApi.blockingRule)
    .then(payload => response.json(payload))
    .catch(err => response.json({'err': err}))
});

app.listen(PORT, HOST);

console.log('Listening on http://%s:%d', HOST || '*', PORT);

/**
 * Export the Express app so that it can be used by Chai
 */
module.exports = app;
