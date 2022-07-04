import type { FC } from "react"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"

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
      console.log("!!!! someone disconnected!", id)
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

  return (
    <AnimatePresence initial={false}>
      {connectedIds.map((id) => (
        <MultiplayerCursor key={id} id={id} />
      ))}
    </AnimatePresence>
  )
}

export default MultiplayerCursors
