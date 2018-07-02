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

    fastify.ws
      .on('connection', socket => {
        socket.send('hello client')

        socket.on('message', msg => {
          t.equal(msg, 'hello server')

          fastify.close()
        })
      })
  })

  fastify.listen(0, err => {
    t.error(err)

    const client = new WebSocket('ws://localhost:' + fastify.server.address().port)

    client.on('open', () => {
      client.send('hello server')

      client.onmessage = msg => t.equal(msg.data, 'hello client')

      client.close()
    })
  })
})

test('Error | invalid library option', t => {
  t.plan(1)

  const fastify = require('fastify')()
  const fastifyWS = require('.')

  fastify.register(fastifyWS, { library: 'invalid' })

  fastify.listen(0, err => {
    fastify.close()
    t.equal(err.message, `Invalid "library" option`)
  })
})
