'use strict';

const path = require('path');

const compression = require('compression'),
      cors = require('cors'),
      express = require('express');

const routes = require('./routes');

const setUser = (req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  req.user = 'logged on idUser';

  next();
};

const getApp = function () {
  const app = express();

  // Set Template-Engine
  app.set('views', './views');
  app.set('view engine', 'pug');

  app.use(express.json());
  app.use(setUser);

  app.use(express.static(path.join(__dirname, 'client')));

  app.use(cors());

  app.use(compression());

  app.use('/room', routes.room);

  app.get('/', (req, res) => {
    res.send('Landingpage locpanel<br><br>tbd...');
  });

  return app;
};

module.exports = getApp;
