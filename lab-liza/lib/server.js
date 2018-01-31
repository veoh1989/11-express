'use strict';

// Application dependencies
const express = require('express');
const cors = require('cors');
const errorHandler = require('./error-handler');


// Application setup
const app = express();
const router = express.Router();
app.use('/api/v1', router);
app.use(cors());
require('../route/route-note')(router);
app.use('/*', (req, res) => errorHandler(new Error('Path Error. Route not found.'), res));

// Server controls
const server = module.exports = {};
server.isOn = false;
server.http = null;

server.start = function(port, callback) {
  if(server.isOn) return callback(new Error('Server running. Cannot start server again.'));
  server.isOn = true;
  server.http = app.listen(port, callback);
};

server.stop = function(callback) {
  if(!server.isOn) return callback(new Error('Server not running. You\'re dumb. Don\'t do that.'));
  server.isOn = false;
  server.http.close();
};