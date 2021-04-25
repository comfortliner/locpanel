'use strict';

const joinRoom = (client, room, callback) => {
  const { id, user_name } = client;
  const message = {};

  message.action = 'join-announce';
  message.data = { sid: id, user_name };
  callback();
};

module.exports = joinRoom;
