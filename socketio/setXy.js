'use strict';

const controllers = require('../controllers'),
      db = require('../models');

const setXy = async (client, data) => {
  try {
    const result = await controllers.card.setXy(db, data);

    return result;
  } catch {
    return {};
  }
};

module.exports = setXy;
