import type { FC } from "react"
import { useEffect, useRef } from "react"
import type { AnimationProps, Transition } from "framer-motion"
import { motion, useAnimation } from "framer-motion"

import type { WebSocketMessageHandler } from "~/types"
import useWebSocket from "~/hooks/useWebSocket"
import { cursorFinger } from "~/components/Svg"

type Props = {
  id: string
}

const exit: AnimationProps["exit"] = {
  scale: 0,
}

const transition: Transition = {
  type: "spring",
  mass: 0.25,
}

const MultiplayerCursor: FC<Props> = ({ id: idProp }) => {
  const socket = useWebSocket()
  const animationControls = useAnimation()
  const initialized = useRef(false)

  useEffect(() => {
    if (!socket) return

    animationControls.set({
      scale: 0,
      top: "50%",
      left: "50%",
    })

    const handleClientCursorMove: WebSocketMessageHandler<
      "onClientCursorMove"
    > = ({ id, payload }) => {
      if (id !== idProp) return

      if (!initialized.current) {
        initialized.current = true
        return animationControls.set({
          scale: 0,
          top: `${payload.y}%`,
          left: `${payload.x}%`,
        })
      }

      animationControls.start(
        {
          scale: 1,
          top: `${payload.y}%`,
          left: `${payload.x}%`,
        },
        transition
      )
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
  }, [animationControls, socket, idProp])

  return (
    <motion.div className="absolute" animate={animationControls} exit={exit}>
      {cursorFinger}
    </motion.div>
  )
}

export default MultiplayerCursor
