const Koa = require('koa')
const app = new Koa()
const colors = require('../fakedata/colors.json')
const swagger = require('../../src')

const port = process.env.PORT || 8000

//This API will give list of different colors
// app.use(async ctx => {
//     ctx.body = colors
// })
app.use(swagger.koa)

app.listen(port, () => {
    console.log('Server is running on PORT ' + port)
})
