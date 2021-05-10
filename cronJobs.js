'use strict';

const { CronJob } = require('cron');

const resetCards = require('./socketio/resetCards');

const controllers = require('./controllers'),
      db = require('./models');

const getAllRooms = async () => {
  const filter = {
    attributes: [ 'id', 'name', 'columns', 'panelmode', 'boardwidth' ]
  };

  try {
    const allRooms = await controllers.room.findAll(db, filter);

    return allRooms;
  } catch {
    return {};
  }
};

const doResetCards = async io => {
  try {
    const allRooms = await getAllRooms();

    for (const room of allRooms) {
      const { name, columns, panelmode } = room;
      let { boardwidth } = room;

      const colcount = typeof columns === 'undefined' || columns === null ? 1 : columns.split(',').length;

      const selectedDoW = typeof panelmode === 'undefined' || panelmode === null || panelmode.toUpperCase() === 'SINGLE' ? 1 : new Date().getDay();

      if (typeof boardwidth === 'undefined' || boardwidth === null) {
        boardwidth = 1280;
      }

      const data = {
        room: name,
        boardwidth,
        colcount,
        selectedDoW
      };

      resetCards(data, result => {
        // report to all clients in this room
        io.in(data.room).emit('message', { action: 'initCards', data: result });
      });
      // eslint-disable-next-line no-console
      console.log(`${new Date().toISOString()} Cronjob: Cards resetted in ${data.room}, selectedDoW ${data.selectedDoW}, panelmode ${panelmode}.`);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`${new Date().toISOString()} Something went wrong in cronJobs.doResetCards. ${JSON.stringify(error.message)}`);
  }
};

const initializeJobs = io => {
  // Five minutes to midnight
  const job1 = new CronJob('00 55 23 * * *', () => {
    doResetCards(io);
  }, null, true, 'Europe/Berlin');

  job1.start();
};

module.exports = {
  initializeJobs
};
