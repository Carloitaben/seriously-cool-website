// @ts-check

const path = require("path")
const express = require("express")
const { createServer } = require("http")
const compression = require("compression")
const morgan = require("morgan")
const { createRequestHandler } = require("@remix-run/express")

const WebSocket = require("ws")

const BUILD_DIR = path.join(process.cwd(), "build")

const app = express()
const httpServer = createServer(app)
const webSocketServer = new WebSocket.WebSocketServer({ port: 8080 })

const urlParamMatch = /(\/\?room=")([^"]+)"/g
webSocketServer.on("connection", (socket, request) => {
  socket.id = request.headers["sec-websocket-key"]
  socket.room = request.url.replace("/?room=", "")

  // Send to socket all currently connected ids
  const otherConnections = []
  webSocketServer.clients.forEach((client) => {
    if (client !== socket && client.room === socket.room) {
      otherConnections.push(client.id)
    }
  })
  socket.send(
    JSON.stringify({
      id: socket.id,
      event: "onInitialConnection",
      payload: otherConnections,
    })
  )

  // Broadcast to currently connected new socket conections
  webSocketServer.clients.forEach((client) => {
    if (
      client !== socket &&
      client.room === socket.room &&
      client.readyState === WebSocket.OPEN
    ) {
      client.send(
        JSON.stringify({
          id: socket.id,
          event: "onClientConnection",
          payload: null,
        })
      )
    }
  })

  socket.on("message", (data) => {
    const { event = "unknown", payload } = JSON.parse(data.toString())

    switch (event) {
      case "onClientCursorMove":
        webSocketServer.clients.forEach((client) => {
          if (
            client !== socket &&
            client.room === socket.room &&
            client.readyState === WebSocket.OPEN
          ) {
            client.send(
              JSON.stringify({
                id: socket.id,
                event,
                payload,
              })
            )
          }
        })
        break
      case "onClientCursorPress":
        webSocketServer.clients.forEach((client) => {
          if (
            client !== socket &&
            client.room === socket.room &&
            client.readyState === WebSocket.OPEN
          ) {
            client.send(
              JSON.stringify({
                id: socket.id,
                event,
                payload,
              })
            )
          }
        })
        break
      default:
        console.warn("unhandled socket event", event)
    }
  })

  socket.on("close", () => {
    webSocketServer.clients.forEach((client) => {
      if (
        client !== socket &&
        client.room === socket.room &&
        client.readyState === WebSocket.OPEN
      ) {
        client.send(
          JSON.stringify({
            id: socket.id,
            event: "onClientDisconnection",
            payload: null,
          })
        )
      }
    })

    socket.terminate()
  })
})

app.use(compression())

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by")

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
)

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }))

app.use(morgan("tiny"))

app.all(
  "*",
  process.env.NODE_ENV === "development"
    ? (req, res, next) => {
        purgeRequireCache()

        return createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV,
        })(req, res, next)
      }
    : createRequestHandler({
        build: require(BUILD_DIR),
        mode: process.env.NODE_ENV,
      })
)

const port = process.env.PORT || 3000

httpServer.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (let key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key]
    }
  }
}
