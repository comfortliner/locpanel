'use strict';

module.exports = {
  development: {
    username: 'sa',
    password: 'P@55w0rd',
    database: 'locpanel',
    dialect: 'mssql',
    dialectOptions: {
      server: 'localhost',
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
    username: 'sa',
    password: 'P@55w0rd',
    database: 'locpanel',
    dialect: 'mssql',
    dialectOptions: {
      server: 'localhost',
      options: {}
    },
    logging: false
  }
};
