'use strict';

const http = require('http');

const sanitizeHtml = require('sanitize-html');

const getApp = require('./getApp'),
      socketio = require('./socketio');

const app = getApp();

const { NODE_ENV, PORT } = process.env;

const server = http.createServer(app);

socketio(server);

// const scrub = text => {
//   let toScrub = text;

//   if (typeof toScrub !== 'undefined' && toScrub !== null) {
//     if (toScrub.length > 65535) {
//       toScrub = toScrub.slice(0, 65535);
//     }

//     return sanitizeHtml(toScrub);
//   }

//   return null;
// };

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${new Date().toISOString()} Server is listening in ${NODE_ENV} on port ${PORT}`);
});
