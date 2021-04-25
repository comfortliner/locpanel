'use strict';

require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './locpanel.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: './locpanel-test.sqlite'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  }
};
