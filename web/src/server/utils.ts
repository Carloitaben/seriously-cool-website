import type {
  Connection,
  Connections,
  ServerEvents,
  ServerEventsHandlersMap,
} from "../types"

export function send<Event extends ServerEvents>(
  event: Event,
  {
    connection,
    payload,
  }: {
    connection: Connection
    payload: ServerEventsHandlersMap[Event]
  }
) {
  const { id, client } = connection
  client.send(
    JSON.stringify({
      id,
      event,
      payload,
    })
  )
}

export function forEveryOtherClient(
  id: string,
  connections: Connections,
  callback: (connection: Connection) => void
) {
  connections.forEach((connection) => {
    if (id !== connection.id) callback(connection)
  })
}

export function mapEveryOtherClient<
  Id extends string,
  ConnectionsGeneric extends Connections,
  Callback extends (connection: Connection) => Partial<Connection> | undefined
>(id: Id, connections: ConnectionsGeneric, callback: Callback) {
  const array: ReturnType<Callback>[] = []

  forEveryOtherClient(id, connections, (connection) => {
    const result = callback(connection) as ReturnType<Callback>
    if (result) array.push(result)
  })

  return array
}
