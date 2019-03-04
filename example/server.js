'use strict'

const fastify = require('fastify')()

fastify.register(require('../.'))

fastify.ready(err => {
  if (err) throw err

  console.log('Server started.')

  fastify.ws
    .on('connection', socket => {
      console.log('Client connected.')

      socket.on('message', msg => socket.send(msg)) // Creates an echo server

      socket.on('close', () => console.log('Client disconnected.'))
    })
})

fastify.listen(34567)
