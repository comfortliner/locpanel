'use strict';

const controllers = require('./../controllers'),
      db = require('./../models');

const getCardsAfterReset = async data => {
  const filter = {
    attributes: { exclude: [ 'extidroom', 'isActive', 'isAdmin', 'KID' ]},
    include: [{
      model: db.Room,
      attributes: [ 'name' ],
      where: {
        name: data.room
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
        { room, selectedDoW } = data,
        filter = {
          attributes: [ 'id', 'x', 'y' ],
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
        maxCardsinXaxis = 4,
        offsetLeft = 940;

  let counterXaxis = 0,
      counterYaxis = 0;

  try {
    const allCards = await controllers.card.findAll(db, filter);

    allCards.forEach(card => {
      const newPosition = {
        id: card.id,
        position: {
          top: 50 + (counterYaxis * distanceToNextCardinYaxis),
          left: offsetLeft + (counterXaxis * distanceToNextCardinXaxis)
        },
        selectedDoW
      };

      controllers.card.setXy(db, newPosition);

      counterXaxis += 1;
      if (counterXaxis === maxCardsinXaxis) {
        counterXaxis = 0;
        counterYaxis += 1;
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
};

const resetCards = async (data, callback) => {
  await writeToDB(data);
  const resetPosition = await getCardsAfterReset(data);

  callback(resetPosition);
};

module.exports = resetCards;
