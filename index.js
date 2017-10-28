'use strict'

const fp = require('fastify-plugin')

module.exports = fp((fastify, opts, next) => {
  const lib = opts.library || 'ws'

  if (lib !== 'ws' && lib !== 'uws') return next(new Error('Invalid "library" option'))

  const WebSocketServer = require(lib).Server
  const wss = new WebSocketServer({
    server: fastify.server
  })

  fastify.decorate('ws', wss)

  next()
})
