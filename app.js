'use strict';

const http = require('http');

const getApp = require('./getApp'),
      socketio = require('./socketio');

const app = getApp();

const { NODE_ENV, PORT } = process.env;

const server = http.createServer(app);

socketio(server);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${new Date().toISOString()} Server is listening in ${NODE_ENV.toUpperCase()} on port ${PORT}`);
});
