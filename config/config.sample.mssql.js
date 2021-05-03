'use strict';

module.exports = {
  development: {
    username: 'YOUR-USERNAME',
    password: 'YOUR-PASSWORD',
    database: 'YOUR-DATABASE-NAME',
    dialect: 'mssql',
    dialectOptions: {
      server: 'YOUR-HOST-NAME',
      options: {}
    },
    logging: console.log
  },
  test: {
    username: '',
    password: '',
    database: '',
    dialect: 'mssql',
    dialectOptions: {
      server: '',
      options: {}
    },
    logging: console.log
  },
  production: {
    username: '',
    password: '',
    database: '',
    dialect: 'mssql',
    dialectOptions: {
      server: '',
      options: {}
    },
    logging: false
  }
};
