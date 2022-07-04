export type WebSocketEvent<Payload = null> = {
  id: string
  payload: Payload
}

type EventsNameAndHandlers = {
  onInitialConnection: WebSocketEvent<string[]>
  onClientConnection: WebSocketEvent<null>
  onClientDisconnection: WebSocketEvent<null>
  onClientCursorMove: WebSocketEvent<{ x: number; y: number }>
  onClientCursorPress: WebSocketEvent<{ active: boolean }>
}

export type WebSocketMessageHandler<Event extends keyof EventsNameAndHandlers> =
  (data: EventsNameAndHandlers[Event]) => void
