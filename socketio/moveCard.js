'use strict';

const moveCard = (socket, data) => {
  const message_out = {
    id: data.id,
    room: data.room,
    position: {
      left: data.position.left,
      top: data.position.top
    },
    selectedDoW: data.selectedDoW
  };

  return message_out;
};

module.exports = moveCard;
