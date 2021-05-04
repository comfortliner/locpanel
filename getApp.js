'use strict';

const path = require('path');

const compression = require('compression'),
      cors = require('cors'),
      express = require('express');

const { authUser, hasCardOnLocpanel } = require('./basicAuth'),
      { getarrDoW } = require('./utils');

// const routes = require('./routes');

const setUser = (req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  req.user = 'P3622';

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

  app.get('/', (req, res) => {
    res.send('Homepage locpanel<br><br>tbd...');
  });

  // app.use('/api', routes.api);

  app.get('/:id', authUser, hasCardOnLocpanel, (req, res) => {
    const pageLocals = {};
    let { selectedDoW } = req.query;

    if (typeof selectedDoW === 'undefined' || Number.isNaN(selectedDoW) || Number.parseInt(selectedDoW, 10) < 1 || Number.parseInt(selectedDoW, 10) > 5) {
      selectedDoW = new Date().getDay();
    }

    pageLocals.pageTitle = `locpanel - ${req.params.id}`;
    pageLocals.room = req.params.id;
    pageLocals.selectedDoW = selectedDoW;
    pageLocals.getarrDoW = getarrDoW;

    res.render('index', pageLocals);
  });

  return app;
};

module.exports = getApp;
