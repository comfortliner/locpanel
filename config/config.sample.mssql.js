'use strict';

module.exports = {
  development: {
    dialect: 'mssql',
    username: 'YOUR-USERNAME',
    password: 'YOUR-PASSWORD',
    host: 'YOUR-HOST-NAME',
    database: 'YOUR-DATABASE-NAME',
    port: 1433,
    dialectOptions: {
      options: {
        instanceName: 'YOUR-INSTANCE-NAME',
        trustedConnection: true
      }
    },
    logging: console.log
  },
  test: {
    dialect: 'mssql',
    username: 'YOUR-USERNAME',
    password: 'YOUR-PASSWORD',
    host: 'YOUR-HOST-NAME',
    database: 'YOUR-DATABASE-NAME',
    port: 1433,
    dialectOptions: {
      options: {
        instanceName: 'YOUR-INSTANCE-NAME',
        trustedConnection: true
      }
    },
    logging: console.log
  },
  production: {
    dialect: 'mssql',
    username: 'YOUR-USERNAME',
    password: 'YOUR-PASSWORD',
    host: 'YOUR-HOST-NAME',
    database: 'YOUR-DATABASE-NAME',
    port: 1433,
    dialectOptions: {
      options: {
        instanceName: 'YOUR-INSTANCE-NAME',
        trustedConnection: true
      }
    },
    logging: false
  }
};
