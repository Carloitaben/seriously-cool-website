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
  const ref = useRef<CursorComponentRef>(null)

  useEffect(() => {
    if (!socket || !ref.current) return

    const handleClientCursorMove: WebSocketMessageHandler<
      "onClientCursorMove"
    > = ({ id, payload }) => {
      if (id === idProp) {
        ref.current?.move(payload.x, payload.y)
      }
    }

    function handleMessage({ data }: { data: string }) {
      const { event, ...rest } = JSON.parse(data.toString())

      switch (event) {
        case "onClientCursorMove":
          return handleClientCursorMove(rest)
        // case "onClientCursorAction": use this to handle clicks and shake
        //   return handleClientCursorAction(rest)
      }
    }

    socket.addEventListener("message", handleMessage, true)
    return () => socket.removeEventListener("message", handleMessage, true)
  }, [socket, idProp])

  return <Cursor ref={ref} type="finger" />
}

export default MultiplayerCursor
