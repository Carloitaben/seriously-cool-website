export type WebSocketEvent<Payload = null> = {
  id: string
  payload: Payload
}

export type CursorMovePayload = {
  x: number
  y: number
}

type EventsNameAndHandlers = {
  onInitialConnection: WebSocketEvent<string[]>
  onClientConnection: WebSocketEvent<null>
  onClientDisconnection: WebSocketEvent<null>
  onClientCursorMove: WebSocketEvent<CursorMovePayload>
}

export type WebSocketMessageHandler<Event extends keyof EventsNameAndHandlers> =
  (data: EventsNameAndHandlers[Event]) => void
