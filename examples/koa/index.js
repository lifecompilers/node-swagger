const Koa = require('koa')
const app = new Koa()
const colors = require('../fakedata/colors.json')
const swagger = require('../../src')
const swaggerUI = require('swagger-ui-dist')
var serveStatic = require('serve-static')
//import { SwaggerUIBundle, SwaggerUIStandalonePreset, getAbsoluteFSPath } from "swagger-ui-dist"
const fs = require('fs');
const swaggerInjector = require('swagger-injector');
const port = process.env.PORT || 8000

//This API will give list of different colors
// app.use(async ctx => {
//     ctx.body = colors
// })
var serve = serveStatic('public/ftp', {'index': ['index.html', 'index.htm']})

//app.use(serve)
var swaggerJSDoc = require('swagger-jsdoc');

var swaggerDefinition = {
    info: {
        title: 'Hello World',
        version: '1.0.0',
        description: 'A sample API',
    },
    host: 'localhost:8000',
    basePath: '/',
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js', './routes/*.yaml'],
};

var swaggerSpec = swaggerJSDoc(options);

app.use(swaggerInjector.koa({swagger: swaggerSpec}));

app.listen(port, () => {
    console.log('Server is running on PORT ' + port)
})
