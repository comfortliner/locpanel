'use strict';

const express = require('express'),
      swaggerJsDoc = require('swagger-jsdoc'),
      swaggerUi = require('swagger-ui-express');

const router = express.Router();

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'locpanel React-Admin API',
      description: 'Documentation of the locpanel React-Admin API',
      contact: {
        name: 'comfortliner',
        url: 'https://github.com/comfortliner/locpanel'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'server'
        }
      ]
    }
  },

  apis: [ './routes/*.js' ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
