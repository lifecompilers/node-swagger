var swaggerJSDoc = require('swagger-jsdoc');

var swaggerDefinition = {
    info: {
        title: 'Hello World',
        version: '1.0.0',
        description: 'A sample API',
    },
    host: 'localhost:3000',
    basePath: '/',
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js', './routes/*.yaml'],
};

var swaggerSpec = swaggerJSDoc(options);

const swaggerUi = require('swagger-ui-express');

const express = require('express').Router();
express.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const koaSwagger = require('koa2-swagger-ui');
const koa = koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: 'http://petstore.swagger.io/v2/swagger.json', // example path to json
    },
  });

module.exports = {
    express,
    koa
}