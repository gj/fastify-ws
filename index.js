'use strict'

const fp = require('fastify-plugin')

module.exports = fp((fastify, opts, next) => {
  const lib = opts.library || 'ws'

  if (lib !== 'ws' && lib !== 'uws') return next(new Error('Invalid "library" option'))

  const WebSocketServer = require(lib).Server

  const wsOpts = {
    server: fastify.server
  }

  if (opts.path !== undefined) {
    wsOpts.path = opts.path
  }

  const wss = new WebSocketServer(wsOpts)

  fastify.decorate('ws', wss)

  fastify.addHook('onClose', (fastify, done) => fastify.ws.close(done))

  next()
}, {
  fastify: '1.7.0 - 2',
  name: 'fastify-ws'
})
