export type Connection = {
  id: string
  client: WebSocket
  room: string
  x?: number
  y?: number
}

export type Connections = Map<string, Connection>

type ServerMessage<Payload> = {
  id: string
  payload: Payload
}

/**
 * WebSocket event payload used server side
 */
export type ServerEventsHandlersMap = {
  /**
   * Emmited by the client when a connection is successfully made
   * Emmited by the server to inform the client with data from users in this room
   */
  initialConnection: {
    id: string
    x: number
    y: number
    theme: string
  }[]
  /**
   * Emmited by the server when an existing connection joins a room
   */
  playerRoomEnter: { id: string; x: number; y: number; theme: string }
  /**
   * Emmited by the server when an existing connection leaves a room
   */
  playerRoomLeave: { id: string }
  /**
   * Emmited by the client when the cursor is moved
   * Emmited by the server to inform when a cursor is moved
   */
  playerCursorMove: { x: number; y: number }
  /**
   * Emmited by the client when the cursor is pressed
   * Emmited by the server to inform when a cursor is pressed
   */
  playerCursorPress: { active: boolean; forceTouch: boolean }
}

/**
 * WebSocket events used server side
 */
export type ServerEvents = keyof ServerEventsHandlersMap

/**
 * WebSocket event payload used client side
 */
export type ClientEventHandlersMap = {
  initialConnection: { theme: string }
  playerCursorMove: { x: number; y: number }
  playerCursorPress: { active: boolean; forceTouch: boolean }
}

/**
 * WebSocket events used client side
 */
export type ClientEvents = keyof ClientEventHandlersMap

/**
 * Handler for events received from the server
 */
export type ServerMessageHandler<Event extends ServerEvents> = (
  event: ServerMessage<ServerEventsHandlersMap[Event]>
) => void
