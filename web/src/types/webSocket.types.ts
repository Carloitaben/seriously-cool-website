type Event<Payload = null> = {
  id: string
  payload: Payload
}

export type EventsNameAndHandlers = {
  onInitialConnection: Event<
    {
      id: string
      room: string
      lastPayload: {
        x?: number
        y?: number
      }
    }[]
  >
  onClientConnection: Event<null>
  onClientDisconnection: Event<null>
  onClientCursorMove: Event<{ x: number; y: number }>
  onClientCursorPress: Event<{ active: boolean; forceTouch: boolean }>
}

export type WebSocketEvent = keyof EventsNameAndHandlers

export type WebSocketMessageHandler<Event extends WebSocketEvent> = (
  data: EventsNameAndHandlers[Event]
) => void
