import type { RequestHandler } from "@remix-run/cloudflare-pages"
import type { ClientEvents, Connection } from "../types"
import { send, forEveryOtherClient, mapEveryOtherClient } from "./utils"

// function handleWebSocketMessages(server: WebSocket, id: string) {
//   const connection = connections.get(id)

//   if (!connection) throw Error(`Missing connection with id ${id}`)

//   server.addEventListener("message", ({ data }) => {
//     const { event, payload } = JSON.parse(data.toString())
//     console.log("received message", event)
//     switch (event as ClientEvents) {
//       case "initialConnection":
//         const currentConnections = mapEveryOtherClient(
//           id,
//           connections,
//           (client) => {
//             if (client.room !== room) {
//               return {
//                 id: client.id,
//                 x: client.x,
//                 y: client.y,
//               }
//             }
//           }
//         )

//         send("initialConnectionResponse", {
//           connection,
//           // @ts-expect-error
//           payload: currentConnections,
//         })
//         break
//       case "cursorMove":
//         forEveryOtherClient(id, connections, (connection) => {
//           connections.set(id, {
//             id,
//             client,
//             room,
//             x: payload.x,
//             y: payload.y,
//           })
//           send("playerCursorMove", {
//             connection,
//             payload,
//           })
//         })
//         break
//       case "cursorPress":
//         forEveryOtherClient(id, connections, (connection) => {
//           send("playerCursorPress", {
//             connection,
//             payload,
//           })
//         })
//         break
//       default:
//         console.warn("Unhandled socket message", event)
//     }
//   })
// }

// export default function handleWebSocket(
//   context: Parameters<RequestHandler>[0]
// ) {
//   const webSocketPair = new WebSocketPair()
//   const [client, server] = Object.values(webSocketPair)

//   // @ts-expect-error
//   server.accept()

//   const id = context.request.headers.get("Sec-WebSocket-Key")!
//   const room = context.request.url.replace("?room=", "")

//   connections.set(id, { id, client, room })

//   websocket.addEventListener("message", async (message) => {
//     console.log(message)
//   })

//   server.onclose = () => connections.delete(id)

//   // handleWebSocketMessages(server, id)

//   return new Response(null, {
//     status: 101,
//     webSocket: client,
//   })
// }

const connections = new Map<string, Connection>()

function handleMessage(connection: Connection, data: string) {
  const { event, payload } = JSON.parse(data)

  console.log(connections.size)

  switch (event as ClientEvents) {
    case "initialConnection":
      send("initialConnection", {
        connection,
        payload: [],
      })
      break
    case "playerCursorMove":
      // do something
      break
    case "playerCursorPress":
      // do something
      break
    default:
      throw Error(`Unhandled socket message: ${event}`)
  }
}

export default async function handleWebSocket(
  context: Parameters<RequestHandler>[0],
  webSocket: WebSocket
) {
  // @ts-expect-error
  webSocket.accept()

  const id = context.request.headers.get("Sec-WebSocket-Key")!
  const room = context.request.url.replace("?room=", "")

  connections.set(id, { id, client: webSocket, room })

  webSocket.addEventListener("message", async ({ data }) => {
    console.log("message event listener data", typeof data, data)
    try {
      const connection = connections.get(id)
      if (!connection) throw Error("missing connection on connections map")
      handleMessage(connection, data)
    } catch (error) {
      console.warn("error handling webSocket message", error)
    }
  })

  webSocket.addEventListener("close", async () => {
    connections.delete(id)
  })
}
