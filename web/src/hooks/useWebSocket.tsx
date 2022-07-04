import type { FC, ReactNode } from "react"
import { createContext, useState, useContext, useEffect } from "react"

export const webSocketContext = createContext<WebSocket | undefined>(undefined)

export const WebSocketProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket>()

  useEffect(() => {
    const connection = new WebSocket("ws://localhost:8080/")

    function onOpen() {
      setSocket(connection)
    }

    function onClose() {
      setSocket(undefined)
    }

    connection.addEventListener("open", onOpen, true)
    connection.addEventListener("close", onClose, true)
    return () => {
      connection.close()
      connection.removeEventListener("open", onOpen, true)
      connection.removeEventListener("close", onClose, true)
    }
  }, [])

  return (
    <webSocketContext.Provider value={socket}>
      {children}
    </webSocketContext.Provider>
  )
}

export default function useWebSocket() {
  return useContext(webSocketContext)
}
