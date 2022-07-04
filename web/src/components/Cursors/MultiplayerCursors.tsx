import type { FC } from "react"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"

import { throttle } from "~/utils"
import type { WebSocketMessageHandler } from "~/types"
import useWebSocket from "~/hooks/useWebSocket"

import MultiplayerCursor from "./MultiplayerCursor"

const MultiplayerCursors: FC = () => {
  const socket = useWebSocket()
  const [connectedIds, setConnectedIds] = useState<string[]>([])

  useEffect(() => {
    if (!socket) return

    const handleInitialConnection: WebSocketMessageHandler<
      "onInitialConnection"
    > = ({ payload }) => {
      setConnectedIds(payload)
    }

    const handleClientConnection: WebSocketMessageHandler<
      "onClientConnection"
    > = ({ id }) => {
      setConnectedIds((current) => {
        const index = current.findIndex((conncetedId) => conncetedId === id)
        if (index === -1) current.push(id)
        return [...current]
      })
    }

    const handleClientDisconnection: WebSocketMessageHandler<
      "onClientDisconnection"
    > = ({ id }) => {
      setConnectedIds((current) => {
        const index = current.findIndex((conncetedId) => conncetedId === id)
        if (index > -1) current.splice(index, 1)
        return [...current]
      })
    }

    function handleMessage({ data }: { data: string }) {
      const { event, ...params } = JSON.parse(data)

      switch (event) {
        case "onInitialConnection":
          return handleInitialConnection(params)
        case "onClientConnection":
          return handleClientConnection(params)
        case "onClientDisconnection":
          return handleClientDisconnection(params)
      }
    }

    socket.addEventListener("message", handleMessage, true)
    return () => socket.removeEventListener("message", handleMessage, true)
  }, [socket])

  useEffect(() => {
    if (!socket) return

    const handlePress = (active: boolean, forceTouch = false) => {
      socket.send(
        JSON.stringify({
          event: "onClientCursorPress",
          payload: { active, forceTouch },
        })
      )
    }

    const handleForceTouchUp = () => handlePress(false, true)
    const handleForceTouchDown = () => handlePress(true, true)
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

    window.addEventListener("webkitmouseforceup", handleForceTouchUp, true)
    window.addEventListener("webkitmouseforcedown", handleForceTouchDown, true)
    window.addEventListener("mouseup", handleMouseUp, true)
    window.addEventListener("mousedown", handleMouseDown, true)
    window.addEventListener("mousemove", handleSendSocketMessage, true)
    return () => {
      window.removeEventListener("webkitmouseforceup", handleForceTouchUp, true) // prettier-ignore
      window.removeEventListener("webkitmouseforcedown", handleForceTouchDown, true) // prettier-ignore
      window.removeEventListener("mouseup", handleMouseUp, true)
      window.removeEventListener("mousedown", handleMouseDown, true)
      window.removeEventListener("mousemove", handleSendSocketMessage, true)
    }
  }, [socket])

  return (
    <AnimatePresence initial={false}>
      {connectedIds.map((id) => (
        <MultiplayerCursor key={id} id={id} />
      ))}
    </AnimatePresence>
  )
}

export default MultiplayerCursors
