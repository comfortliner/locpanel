'use strict';

const express = require('express');

const router = express.Router();

const { authUser, hasCardOnLocpanel } = require('../basicAuth'),
      { getarrDoW } = require('../utils'),
      controllers = require('../controllers'),
      db = require('../models');

const getPanelMode = async data => {
  const filter = {
    attributes: [ 'panelmode' ],
    where: {
      name: data.room
    }
  };

  try {
    const result = await controllers.room.findOne(db, filter);

    return result;
  } catch {
    return {};
  }
};

const callRoom = async (req, res) => {
  const pageLocals = {};

  const { room } = req.params;

  let { selectedDoW } = req.query,
      { NODE_ENV } = process.env,
      { panelmode } = await getPanelMode({ room: `/${room}` });

  NODE_ENV = NODE_ENV.toUpperCase();
  panelmode = panelmode.toUpperCase();

  if (panelmode === 'SINGLE') {
    selectedDoW = 1;
  }

  if (panelmode === 'MULTI' &&
     (typeof selectedDoW === 'undefined' || Number.isNaN(selectedDoW) || Number.parseInt(selectedDoW, 10) < 1 || Number.parseInt(selectedDoW, 10) > 5)) {
    selectedDoW = new Date().getDay();
  }

  pageLocals.pageTitle = `locpanel - ${room}`;
  pageLocals.room = room;
  pageLocals.selectedDoW = selectedDoW;
  pageLocals.getarrDoW = getarrDoW;
  pageLocals.panelMode = panelmode;
  pageLocals.env = NODE_ENV;

  res.render('room', pageLocals);
};

router.get('/:room', authUser, hasCardOnLocpanel, callRoom);

module.exports = router;
