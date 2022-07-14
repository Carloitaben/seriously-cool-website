import type { FC } from "react"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"

import type { ServerEvents, ServerMessageHandler } from "~/types"
import { sendSocketEventToServer, throttle } from "~/utils"
import useWebSocket from "~/hooks/useWebSocket"

import MultiplayerCursor from "./MultiplayerCursor"

const MultiplayerCursors: FC = () => {
  const socket = useWebSocket()
  const [connectedIds, setConnectedIds] = useState<string[]>([])

  useEffect(() => {
    if (!socket) return

    // Request a list of connected clients for this room
    sendSocketEventToServer("initialConnection", {
      socket,
      payload: {
        theme: "sword",
      },
    })

    const handleInitialConnection: ServerMessageHandler<
      "initialConnection"
    > = ({ payload }) => {
      const ids = payload.map(({ id }) => id)
      setConnectedIds(ids)
    }

    const handlePlayerRoomEnter: ServerMessageHandler<"playerRoomEnter"> = ({
      payload,
    }) => {
      setConnectedIds((current) => {
        const index = current.findIndex((id) => id === payload.id)
        if (index === -1) current.push(payload.id)
        return [...current]
      })
    }

    const handlePlayerRoomLeave: ServerMessageHandler<"playerRoomLeave"> = ({
      id,
    }) => {
      setConnectedIds((current) => {
        const index = current.findIndex((conncetedId) => conncetedId === id)
        if (index > -1) current.splice(index, 1)
        return [...current]
      })
    }

    function handleMessage({ data }: { data: string }) {
      const { event, ...params } = JSON.parse(data)
      console.log("received message", event, params)

      switch (event as ServerEvents) {
        case "initialConnection":
          return handleInitialConnection(params)
        case "playerRoomEnter":
          return handlePlayerRoomEnter(params)
        case "playerRoomLeave":
          return handlePlayerRoomLeave(params)
      }
    }

    socket.addEventListener("message", handleMessage, true)
    return () => socket.removeEventListener("message", handleMessage, true)
  }, [socket])

  useEffect(() => {
    if (!socket) return

    const handlePress = (active: boolean, forceTouch = false) => {
      sendSocketEventToServer("playerCursorPress", {
        socket,
        payload: {
          active,
          forceTouch,
        },
      })
    }

    const handleForceTouchUp = () => handlePress(false, true)
    const handleForceTouchDown = () => handlePress(true, true)
    const handleMouseUp = () => handlePress(false)
    const handleMouseDown = () => handlePress(true)

    const handleSendSocketMessage = throttle((event: MouseEvent) => {
      sendSocketEventToServer("playerCursorMove", {
        socket,
        payload: {
          x: (event.clientX * 100) / window.innerWidth,
          y: (event.clientY * 100) / window.innerHeight,
        },
      })
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
