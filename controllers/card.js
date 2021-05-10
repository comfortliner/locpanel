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

  const { id, position, selectedDoW } = data,
        { top, left } = position;

  const key1 = `x${selectedDoW}`,
        key2 = `y${selectedDoW}`;

  try {
    const result = await db.Card.update({ [key1]: left, [key2]: top }, {
      where: {
        id
      }
    });

    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`${new Date().toISOString()} Something went wrong in card.setXy. ${JSON.stringify(error.message)}`);
  }
};

module.exports = {
  findAll,
  setXy
};
