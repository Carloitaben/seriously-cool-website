import type { FC } from "react"
import { useEffect, useRef } from "react"

import type { WebSocketMessageHandler } from "~/types"
import useWebSocket from "~/hooks/useWebSocket"

import Cursor from "./Cursor"
import type { CursorComponentRef } from "./Cursor"

type Props = {
  id: string
}

const MultiplayerCursor: FC<Props> = ({ id: idProp }) => {
  const socket = useWebSocket()
  const cursor = useRef<CursorComponentRef>(null)

  useEffect(() => {
    if (!socket || !cursor.current) return

    const handleClientCursorMove: WebSocketMessageHandler<
      "onClientCursorMove"
    > = ({ id, payload }) => {
      if (id === idProp) {
        cursor.current!.move(payload.x, payload.y)
      }
    }

    const handleClientCursorPress: WebSocketMessageHandler<
      "onClientCursorPress"
    > = ({ id, payload }) => {
      if (id === idProp) {
        cursor.current!.click(payload.active)
      }
    }

    function handleMessage({ data }: { data: string }) {
      const { event, ...rest } = JSON.parse(data.toString())

      switch (event) {
        case "onClientCursorMove":
          return handleClientCursorMove(rest)
        case "onClientCursorPress":
          return handleClientCursorPress(rest)
      }
    }

    socket.addEventListener("message", handleMessage, true)
    return () => socket.removeEventListener("message", handleMessage, true)
  }, [socket, idProp])

  return <Cursor ref={cursor} type="finger" />
}

export default MultiplayerCursor
