// 'use strict';
//
// const express = require('express');
// const http = require('http');
//
// // Constants
// const PORT = 8080;
// const HOST = '0.0.0.0';
//
// // App
// const app = express();
// app.get('/', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({"msg": "Hello from the Node API"}));
// });
//
// app.listen(PORT, HOST);
//
// console.log(`Running on http://${HOST}:${PORT}`);
//
// module.exports = app;
//

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = 8080;


//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore!"}));

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
