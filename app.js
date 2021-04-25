'use strict';

require('dotenv').config();

const http = require('http');

const sanitizeHtml = require('sanitize-html');

const getApp = require('./getApp'),
      socketio = require('./socketio');

const app = getApp();

const { PORT } = process.env;

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
  console.log(`Server is listening on port ${PORT}`);
});
