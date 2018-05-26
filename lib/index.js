const path = require('path')
const fs = require('fs')
const defaultsDeep = require('lodash.defaultsdeep')
const Handlebars = require('handlebars')

const json = require('../package.json')

const defaultOptions = {
  title: 'Swagger UI',
  oauthOptions: false,
  swaggerOptions: {
    dom_id: '#swagger-ui',
    url: 'http://petstore.swagger.io/v2/swagger.json',
    layout: 'StandaloneLayout'
  },
  routePrefix: false,
  swaggerVersion: json.devDependencies['swagger-ui-dist'],
  hideTopbar: false
}

module.exports.koa = (config) => {
  const options = defaultsDeep(config || {}, defaultOptions)
  Handlebars.registerHelper('json', context => JSON.stringify(context))
  Handlebars.registerHelper('strfnc', fnc => fnc)
  Handlebars.registerHelper('isset', function (conditional, options) { return conditional ? options.fn(this) : options.inverse(this) })
  const index = Handlebars.compile(fs.readFileSync(path.join(__dirname, './index.hbs'), 'utf-8'))

  return (ctx, next) => {
    if (options.routePrefix === false || ctx.path === options.routePrefix) {
      ctx.type = 'text/html'
      ctx.body = index(options)
      return true
    }
    return next()
  }
}

module.exports.express = (config) => {
  const options = defaultsDeep(config || {}, defaultOptions)
  Handlebars.registerHelper('json', context => JSON.stringify(context))
  Handlebars.registerHelper('strfnc', fnc => fnc)
  Handlebars.registerHelper('isset', function (conditional, options) { return conditional ? options.fn(this) : options.inverse(this) })
  const index = Handlebars.compile(fs.readFileSync(path.join(__dirname, './index.hbs'), 'utf-8'))

  return (req, res, next) => {
    if (options.routePrefix === false || req.path === options.routePrefix) {
      res.contentType('text/html')
      res.send(index(options))
      return true
    }
    return next()
  }
}
