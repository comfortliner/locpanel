'use strict';

const controllers = require('./../controllers'),
      db = require('./../models');

const getCardsAfterReset = async room => {
  const filter = {
    attributes: { exclude: [ 'extidroom', 'isActive', 'isAdmin', 'idUser' ]},
    include: [{
      model: db.Room,
      attributes: [ 'name' ],
      where: {
        name: room
      }
    }],
    where: {
      isActive: 1
    }
  };

  try {
    const allCards = await controllers.card.findAll(db, filter);

    return allCards;
  } catch {
    return {};
  }
};

const writeToDB = async data => {
  const distanceToNextCardinXaxis = 80,
        distanceToNextCardinYaxis = 50,
        { room, selectedDoW, boardwidth, colcount } = data,
        filter = {
          attributes: [ 'id' ],
          include: [{
            model: db.Room,
            attributes: [ 'name' ],
            where: {
              name: room
            }
          }],
          where: {
            isActive: 1
          },
          raw: true
        },
        maxCardsinXaxis = Math.round((boardwidth / colcount) / 80),
        offsetLeft = ((boardwidth / colcount) * (colcount - 1)) - 30;

  let counterXaxis = 0,
      counterYaxis = 0;

  try {
    const allCards = await controllers.card.findAll(db, filter);

    for (const card of allCards) {
      const newPosition = {
        id: card.id,
        position: {
          top: 50 + (counterYaxis * distanceToNextCardinYaxis),
          left: offsetLeft + (counterXaxis * distanceToNextCardinXaxis)
        },
        selectedDoW
      };

      await controllers.card.setXy(db, newPosition);

      counterXaxis += 1;
      if (counterXaxis === maxCardsinXaxis) {
        counterXaxis = 0;
        counterYaxis += 1;
      }
    }

    return room;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`${new Date().toISOString()} Something went wrong in resetCards.writeToDB. ${JSON.stringify(error.message)}`);
  }
};

const resetCards = async (data, callback) => {
  let resetPosition = {};

  try {
    const room = await writeToDB(data);

    resetPosition = await getCardsAfterReset(room);

    return callback(resetPosition);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`${new Date().toISOString()} Something went wrong in resetCards.resetCards. ${JSON.stringify(error.message)}`);
  }
};

module.exports = resetCards;
