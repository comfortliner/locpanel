'use strict';

const initClient = require('./initClient'),
      joinRoom = require('./joinRoom'),
      moveCard = require('./moveCard'),
      resetCards = require('./resetCards'),
      setXy = require('./setXy');

const socketio = require('socket.io');

const initializeIOServer = server => {
  const io = socketio(server);

  io.on('connection', socket => {
    socket.on('message', message => {
      const { action, data } = message;

      // eslint-disable-next-line no-console
      console.log(`From Client: action:${action}, data:${data}`);

      if (!action) {
        return false;
      }

      switch (action) {
        case 'initializeMe':
          initClient(socket, data);
          break;

        case 'joinRoom':
          joinRoom(socket, data, () => {
            socket.join(data.room);
            socket.emit('message', { action: 'roomAccept', data });
          });
          break;

        case 'moveCard':
          // report to all other clients in the same room
          socket.to(data.room).emit('message', { action, data: moveCard(socket, data) });

          // store the new position in the database
          setXy(socket, data);
          break;

        case 'resetCards':
          resetCards(data, result => {
            // report to all clients in the same room
            io.to(data.room).emit('message', { action: 'initCards', data: result });
          });
          break;

        default:
          // eslint-disable-next-line no-console
          console.log(`Unknown action ${action}`);
          break;
      }
    });

    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = initializeIOServer;
