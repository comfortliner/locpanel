'use strict';

const debug = require('debug')('app:socketio:initClient');

const controllers = require('../controllers'),
      db = require('../models');

const getInitCards = async data => {
  const filter = {
    attributes: { exclude: [ 'extidroom', 'isActive', 'isAdmin', 'idUser' ]},
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

const getInitColumns = async data => {
  const filter = {
    attributes: [ 'columns' ],
    where: {
      name: data.room
    }
  };

  try {
    const { columns } = await controllers.room.findOne(db, filter);
    const result = columns.split(',').map(value => value.trim());

    return result;
  } catch {
    return {};
  }
};

const initClient = (client, data) => {
  debug('initClient Started');

  getInitCards(data).then(result => {
    client.emit('message', { action: 'initCards', data: result });
  });

  getInitColumns(data).then(result => {
    client.emit('message', { action: 'initColumns', data: result });
  });
};

module.exports = initClient;
