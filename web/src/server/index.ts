import type { RequestHandler } from "@remix-run/cloudflare-pages"
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages"
import * as build from "@remix-run/dev/server-build"

import handleWebSocket from "./handleWebSocket"

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => context.env,
})

export const onRequest: RequestHandler = async (context) => {
  const upgradeHeader = context.request.headers.get("Upgrade")

  if (upgradeHeader === "websocket") {
    const [client, server] = Object.values(new WebSocketPair())
    await handleWebSocket(context, server)
    return new Response(null, {
      status: 101,
      webSocket: client,
    })
  }

  return handleRequest(context)
}
