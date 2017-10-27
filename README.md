# fastify-ws

[![Build Status](https://travis-ci.org/gj/fastify-ws.svg?branch=master)](https://travis-ci.org/gj/fastify-ws) [![npm version](https://badge.fury.io/js/fastify-ws.svg)](https://www.npmjs.com/package/fastify-ws)

WebSocket support for [Fastify](https://github.com/fastify/fastify) built on the blazing fast [ws](http://npm.im/ws) and [uws](http://npm.im/uws) libraries.

## Example
In `server.js`:
```js
'use strict'

const fastify = require('fastify')()

fastify.register(require('fastify-ws'), {
  wsLibrary: 'uws' // Use the uws library instead of the default ws library
})

fastify.ready(err => {
  if (err) throw err

  fastify.wsServer
    .on('connection', ws => {
      ws.on('message', msg => ws.send(msg)) // Creates an echo server
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
If you choose to use `uws` as your WebSocket library, ensure that you have configured your system properly and understand that the API is a slightly reduced subset of `ws`'s.

## TODO

* [ ] Get TAP test suite to finish without resorting to `process.exit()`

## License

Licensed under [MIT](./LICENSE).
