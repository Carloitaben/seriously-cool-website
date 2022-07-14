import type { FC, ReactNode } from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { useLocation } from "@remix-run/react"

export const webSocketContext = createContext<WebSocket | undefined>(undefined)

export const WebSocketProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket>()
  const { pathname } = useLocation()

  useEffect(() => {
    console.log("pathname", pathname)
    try {
      const room = pathname === "/" ? "home" : "project"
      const connection = new WebSocket(`ws://localhost:8788/?room=${room}`)

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
    } catch (error) {
      // noop
    }
  }, [pathname])

  return (
    <webSocketContext.Provider value={socket}>
      {children}
    </webSocketContext.Provider>
  )
}

export default function useWebSocket() {
  return useContext(webSocketContext)
}
