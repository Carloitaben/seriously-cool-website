import {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
} from "react"
import type { Transition, Variants } from "framer-motion"
import { motion, useAnimation } from "framer-motion"

import { cursorFinger } from "~/components/Svg"

type Props = {
  type: "finger"
}

const variants: Variants = {
  hidden: {
    scale: 0,
  },
}

const transition: Transition = {
  type: "spring",
  mass: 0.05,
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
      // TODO: click. handleClick
    }),
    [handleMove]
  )

  return (
    <motion.div
      className="absolute"
      ref={innerRef}
      initial="hidden"
      animate={controls}
      exit="hidden"
      variants={variants}
    >
      {cursorFinger}
    </motion.div>
  )
})

Cursor.displayName = "Cursor"

export default Cursor
