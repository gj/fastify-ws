# fastify-ws

[![Build Status](https://travis-ci.org/gj/fastify-ws.svg?branch=master)](https://travis-ci.org/gj/fastify-ws) [![npm version](https://badge.fury.io/js/fastify-ws.svg)](https://www.npmjs.com/package/fastify-ws)

WebSocket support for [Fastify](https://github.com/fastify/fastify) built on the [ws](http://npm.im/ws) and [uws](http://npm.im/uws) libraries.

## Example

In `server.js`:

```js
'use strict'

const fastify = require('fastify')()

fastify.register(require('fastify-ws'))

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
```

Then run `node server.js` and navigate to `http://localhost:34567` in your browser. In the browser's JavaScript console, open a client-side WebSocket connection:

```js
const host = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(host)
ws.onmessage = msg => console.log(msg.data)
```

Then, still in the browser console, send some messages to the server and watch as they're echoed back to you:

```js
ws.send('WebSockets are awesome!')
// => undefined
// LOG: WebSockets are awesome!
```

## Notes

The creator of `uws` has ceased development on `uws` and started working on their new project, [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js). If you want high-performance web socket support in Fastify, the last real release of `uws` (10.148.1) is probably your best bet, but given that it is now an abandoned project I can't recommend anyone use it for any non-throwaway projects. If you're using this library, I'd recommend you stick with the default `ws` option.

In addition, if you choose to use `uws` as your WebSocket library, ensure that you have configured your system properly and understand that the API is a slightly reduced subset of `ws`'s.

## License

Licensed under [MIT](./LICENSE).
