'use strict'

const test = require('tap').test

test('expose a WebSocket', t => {
  t.plan(4)

  const fastify = require('fastify')()
  const fastifyWS = require('.')
  const WebSocket = require('ws')

  fastify.register(fastifyWS)

  fastify.ready(err => {
    t.error(err)

    fastify.wsServer
      .on('connection', ws => {
        ws.send('hello client')

        ws.on('message', msg => {
          t.equal(msg, 'hello server')

          ws.terminate()
          fastify.wsServer.close(() => fastify.close())

          process.exit()
        })
      })
  })

  fastify.listen(0, err => {
    t.error(err)

    const client = new WebSocket('ws://localhost:' + fastify.server.address().port)

    client.on('open', () => {
      client.send('hello server')

      client.onmessage = msg => {
        t.equal(msg.data, 'hello client')

        client.terminate()
      }
    })
  })
})
