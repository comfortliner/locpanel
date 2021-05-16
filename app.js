'use strict';

const http = require('http');

const getApp = require('./getApp'),
      { initializeJobs } = require('./cronJobs'),
      socketio = require('./socketio');

const app = getApp();

const { NODE_ENV, PORT = 3000 } = process.env;

const server = http.createServer(app);

const io = socketio(server);

initializeJobs(io);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${new Date().toISOString()} Server is listening in ${NODE_ENV.toUpperCase()} on port ${PORT}`);
});
