const Koa = require('koa')
const swagger = require('../../lib/')
const router = require('koa-router')()

const PORT = 9004
const app = new Koa()

router.get('/swagger', swagger.koa())

app.use(router.routes())

const server = app.listen(PORT, () => {
  console.log(`Koa app is listening at PORT ${PORT}`)
})

module.exports = server
