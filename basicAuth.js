'use strict';

const controllers = require('./controllers'),
      db = require('./models');

const getAllCards = async room => {
  const filter = {
    attributes: [ 'idUser' ],
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
  };

  try {
    const allCards = await controllers.card.findAll(db, filter);

    return allCards;
  } catch {
    return {};
  }
};

const authUser = (req, res, next) => {
  return next();

  // eslint-disable-next-line no-unreachable
  if (typeof req.user === 'undefined' || req.user === null) {
    res.status(403);

    return res.send('No authentication possible.');
  }

  next();
};

const hasCardOnLocpanel = async (req, res, next) => {
  return next();

  // eslint-disable-next-line no-unreachable
  const allCards = await getAllCards(`/${req.params.room}`);
  const UserhasCard = allCards.some(items => items.idUser === req.user);

  if (!UserhasCard) {
    res.status(401);

    return res.send('You do not have the permissions to use this locpanel.');
  }

  next();
};

module.exports = {
  authUser,
  hasCardOnLocpanel
};
