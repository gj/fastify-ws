# fastify-ws

<!-- [![Greenkeeper badge](https://badges.greenkeeper.io/fastify/fastify-ws.svg)](https://greenkeeper.io/) -->

WebSocket support for [Fastify](https://github.com/fastify/fastify) built on the blazing fast [ws](http://npm.im/websocket-stream) library.

## Example
In `server.js`:
```js
'use strict'

const fastify = require('fastify')()

fastify.register(require('fastify-ws'), {
  pingInterval: 10000 // Keep the connection alive by sending ping every 10 seconds (default: 30 seconds)
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

## TODO

* [ ] Get TAP test suite to finish without resorting to `process.exit()`

## License

Licensed under [MIT](./LICENSE).
