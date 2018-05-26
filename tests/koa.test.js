const server = require('../examples/koa/index')
const supertest = require('supertest')

let http

beforeEach(() => {
  http = supertest(server)
})

afterEach(() => {
  server.close()
})

describe('Koa swagger', () => {
  it('should respond as expected', async () => {
    const response = await http.get('/swagger')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('text/html')
  })

  it('With wrong URL should return 404', async () => {
    const response = await http.get('/')
    expect(response.status).toEqual(404)
  })
})
