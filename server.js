'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.json({
  limit: '100k',
}));

app.get('/', function(req, res, next) {
  res.json({'msg': 'Hello from the Node API deployed!'})
})

app.listen(PORT, HOST);

console.log('Listening on http://%s:%d', HOST || '*', PORT);

/**
 * Export the Express app so that it can be used by Chai
 */
module.exports = app;
