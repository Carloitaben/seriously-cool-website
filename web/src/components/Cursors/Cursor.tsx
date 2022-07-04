import {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
} from "react"
import type { AnimationProps, Transition } from "framer-motion"
import { motion, useAnimation } from "framer-motion"

import { cursorFinger } from "~/components/Svg"

type Props = {
  type: "finger"
}

const exit: AnimationProps["exit"] = {
  scale: 0,
}

const transition: Transition = {
  type: "spring",
  mass: 0.25,
}

export type CursorComponentRef = {
  move: (x: number, y: number) => void
}

const Cursor = forwardRef<CursorComponentRef, Props>(({ type }, ref) => {
  const controls = useAnimation()
  const initialized = useRef(false)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    controls.set({
      scale: 0,
      top: "50%",
      left: "50%",
    })
  }, [controls])

  const handleMove = useCallback(
    (x: number, y: number) => {
      if (!initialized.current) {
        controls.set({
          top: `${y}%`,
          left: `${x}%`,
        })
        return (initialized.current = true)
      }

      controls.start(
        {
          scale: 1,
          top: `${y}%`,
          left: `${x}%`,
        },
        transition
      )
    },
    [controls]
  )

  useImperativeHandle(
    ref,
    () => ({
      move: handleMove,
    }),
    [handleMove]
  )

  return (
    <motion.div
      className="absolute"
      ref={innerRef}
      animate={controls}
      exit={exit}
    >
      {cursorFinger}
    </motion.div>
  )
})

Cursor.displayName = "Cursor"

export default Cursor
