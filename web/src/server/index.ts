import type { RequestHandler } from "@remix-run/cloudflare-pages"
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages"

import * as build from "@remix-run/dev/server-build"

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => context.env,
})

function handleWebSocket() {
  const webSocketPair = new WebSocketPair()
  const [client, server] = Object.values(webSocketPair)

  // @ts-expect-error
  server.accept()

  server.addEventListener("message", (event) => {
    console.log(event.data)
  })

  return new Response(null, {
    status: 101,
    webSocket: client,
  })
}

export const onRequest: RequestHandler = (context) => {
  const upgradeHeader = context.request.headers.get("Upgrade")

  if (upgradeHeader === "websocket") {
    return handleWebSocket()
  }

  return handleRequest(context)
}
