import type { FC } from "react"
import { useEffect, useRef } from "react"

import type { ServerEvents, ServerMessageHandler } from "~/types"
import useWebSocket from "~/hooks/useWebSocket"

import Cursor from "./Cursor"
import type { CursorProps } from "./Cursor"

type Props = {
  id: string
}

const MultiplayerCursor: FC<Props> = ({ id: idProp }) => {
  const socket = useWebSocket()
  const cursor = useRef<CursorProps>(null)

  useEffect(() => {
    if (!socket || !cursor.current) return

    const handlePlayerCursorMove: ServerMessageHandler<"playerCursorMove"> = ({
      id,
      payload,
    }) => {
      if (id === idProp) {
        cursor.current!.move(payload.x, payload.y)
      }
    }

    const handlePlayerCursorPress: ServerMessageHandler<
      "playerCursorPress"
    > = ({ id, payload }) => {
      if (id === idProp) {
        cursor.current!.click(payload.active, payload.forceTouch)
      }
    }

    function handleMessage({ data }: { data: string }) {
      const { event, ...rest } = JSON.parse(data.toString())

      switch (event as ServerEvents) {
        case "playerCursorMove":
          return handlePlayerCursorMove(rest)
        case "playerCursorPress":
          return handlePlayerCursorPress(rest)
      }
    }

    socket.addEventListener("message", handleMessage, true)
    return () => socket.removeEventListener("message", handleMessage, true)
  }, [socket, idProp])

  return <Cursor ref={cursor} type="finger" />
}

export default MultiplayerCursor
