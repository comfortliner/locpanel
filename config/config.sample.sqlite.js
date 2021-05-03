'use strict';

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './locpanel.sqlite',
    logging: console.log
  },
  test: {
    dialect: 'sqlite',
    storage: './locpanel-test.sqlite',
    logging: console.log
  },
  production: {
    dialect: 'sqlite',
    storage: './locpanel-prod.sqlite',
    logging: false
  }
};
