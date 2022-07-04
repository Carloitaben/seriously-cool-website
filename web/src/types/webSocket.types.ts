type Event<Payload = null> = {
  id: string
  payload: Payload
}

type EventsNameAndHandlers = {
  onInitialConnection: Event<string[]>
  onClientConnection: Event<null>
  onClientDisconnection: Event<null>
  onClientCursorMove: Event<{ x: number; y: number }>
  onClientCursorPress: Event<{ active: boolean; forceTouch: boolean }>
}

export type WebSocketEvent = keyof EventsNameAndHandlers

export type WebSocketMessageHandler<Event extends WebSocketEvent> = (
  data: EventsNameAndHandlers[Event]
) => void
