'use strict'

const fp = require('fastify-plugin')

module.exports = fp((fastify, opts, next) => {
  const wsLib = opts.wsLibrary || 'ws'

  if (wsLib !== 'ws' && wsLib !== 'uws') return next(new Error('Invalid "wsLibrary" option'))

  const WebSocketServer = require(wsLib).Server
  const wss = new WebSocketServer({
    server: fastify.server
  })

  fastify.decorate('wsServer', wss)

  next()
})
