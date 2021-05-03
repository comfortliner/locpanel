'use strict';

const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
const { Op } = Sequelize;

const findAll = async (db, filter) => {
  if (!db) {
    throw new Error('Database is missing.');
  }

  if (!filter) {
    // eslint-disable-next-line no-param-reassign
    filter = {};
  }

  try {
    const result = await db.Card.findAll(filter);

    if (result === null) {
      return [];
    }

    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`${new Date().toISOString()} Something went wrong in card.findAll. ${JSON.stringify(error.message)}`);
  }
};

const setXy = async (db, data) => {
  if (!db) {
    throw new Error('Database is missing.');
  }

  if (!data) {
    throw new Error('No data to update.');
  }

  const { id, position } = data,
        { top, left } = position;

  try {
    await db.Card.update({ x: left, y: top }, {
      where: {
        id
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`${new Date().toISOString()} Something went wrong in card.setXy. ${JSON.stringify(error.message)}`);
  }
};

module.exports = {
  findAll,
  setXy
};
