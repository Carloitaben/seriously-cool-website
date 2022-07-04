import type { FC } from "react"
import { useEffect } from "react"

import useWebSocket from "~/hooks/useWebSocket"
import { throttle } from "~/utils"

import MultiplayerCursors from "./MultiplayerCursors"

const Cursors: FC = () => {
  const socket = useWebSocket()

  useEffect(() => {
    if (!socket) return

    const handleMouseMove = throttle((event: MouseEvent) => {
      socket.send(
        JSON.stringify({
          event: "onClientCursorMove",
          payload: {
            x: (event.clientX * 100) / window.innerWidth,
            y: (event.clientY * 100) / window.innerHeight,
          },
        })
      )
    }, 80)

    window.addEventListener("mousemove", handleMouseMove, true)
    return () => window.removeEventListener("mousemove", handleMouseMove, true)
  }, [socket])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0">
      <MultiplayerCursors />
    </div>
  )
}

export default Cursors
