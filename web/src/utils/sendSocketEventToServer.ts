import type { ClientEvents, ClientEventHandlersMap } from "~/types"

export function sendSocketEventToServer<Event extends ClientEvents>(
  event: Event,
  {
    socket,
    payload,
  }: {
    socket: WebSocket
    payload: ClientEventHandlersMap[Event]
  }
) {
  socket.send(
    JSON.stringify({
      event,
      payload,
    })
  )
}
