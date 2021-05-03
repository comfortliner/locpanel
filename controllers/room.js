'use strict';

const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
const { Op } = Sequelize;

const findOne = async (db, filter) => {
  if (!db) {
    throw new Error('Database is missing.');
  }

  if (!filter) {
    // eslint-disable-next-line no-param-reassign
    filter = {};
  }

  try {
    const result = await db.Room.findOne(filter);

    if (result === null) {
      return [];
    }

    return result.dataValues;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`${new Date().toISOString()} Something went wrong in room.findOne. ${JSON.stringify(error.message)}`);
  }
};

module.exports = {
  findOne
};
