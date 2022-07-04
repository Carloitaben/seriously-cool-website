import type { FC } from "react"
import { useRef, useEffect } from "react"

import useWebSocket from "~/hooks/useWebSocket"
import { throttle } from "~/utils"

import type { CursorComponentRef } from "./Cursor"
import Cursor from "./Cursor"
import MultiplayerCursors from "./MultiplayerCursors"

const Cursors: FC = () => {
  const socket = useWebSocket()
  const cursor = useRef<CursorComponentRef>(null)

  useEffect(() => {
    if (!socket || !cursor.current) return

    const handlePress = (active: boolean) => {
      socket.send(
        JSON.stringify({
          event: "onClientCursorPress",
          payload: { active },
        })
      )
    }

    const handleMouseUp = () => handlePress(false)
    const handleMouseDown = () => handlePress(true)

    const handleSendSocketMessage = throttle((event: MouseEvent) => {
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

    window.addEventListener("mouseup", handleMouseUp, true)
    window.addEventListener("mousedown", handleMouseDown, true)
    window.addEventListener("mousemove", handleSendSocketMessage, true)
    return () => {
      window.removeEventListener("mouseup", handleMouseUp, true)
      window.removeEventListener("mousedown", handleMouseDown, true)
      window.removeEventListener("mousemove", handleSendSocketMessage, true)
    }
  }, [socket])

  useEffect(() => {
    const handleMouseUp = () => {
      cursor.current!.click(false)
    }

    const handleMouseDown = () => {
      cursor.current!.click(true)
    }

    const handleMouseMove = throttle((event: MouseEvent) => {
      const x = (event.clientX * 100) / window.innerWidth
      const y = (event.clientY * 100) / window.innerHeight
      cursor.current!.move(x, y)
    }, 50)

    window.addEventListener("mouseup", handleMouseUp, true)
    window.addEventListener("mousedown", handleMouseDown, true)
    window.addEventListener("mousemove", handleMouseMove, true)
    return () => {
      window.removeEventListener("mouseup", handleMouseUp, true)
      window.removeEventListener("mousedown", handleMouseDown, true)
      window.removeEventListener("mousemove", handleMouseMove, true)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0">
      <Cursor ref={cursor} type="finger" />
      <MultiplayerCursors />
    </div>
  )
}

export default Cursors
