const Koa = require('koa')
const swagger = require('../../lib/')
const router = require('koa-router')()

const PORT = 9001
const app = new Koa()

router.get('/swagger', swagger.koa({ routePrefix: false }))

app.use(router.routes())

app.listen(PORT, () => {
  console.log(`Koa app is listening at PORT ${PORT}`)
})
