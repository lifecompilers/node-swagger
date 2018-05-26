const Express = require('express')
const swagger = require('../../lib/')

const PORT = 9002
const app = new Express()

app.use('/swagger', swagger.express())

const server = app.listen(PORT, () => {
  console.log(`Express app is listening at PORT ${PORT}`)
})

module.exports = server
