import { forwardRef, useRef, useCallback, useImperativeHandle } from "react"
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
  click: (active: boolean) => void
}

const Cursor = forwardRef<CursorComponentRef, Props>(({ type }, ref) => {
  const containerControls = useAnimation()
  const cursorControls = useAnimation()

  const initialized = useRef(false)

  const handleMove = useCallback(
    (x: number, y: number) => {
      if (!initialized.current) {
        containerControls.set({
          x: `${x}%`,
          y: `${y}%`,
        })

        initialized.current = true
        return cursorControls.start({ scale: 1 }, transition)
      }

      containerControls.start(
        {
          x: `${x}%`,
          y: `${y}%`,
        },
        transition
      )
    },
    [containerControls, cursorControls]
  )

  const handleClick = useCallback(
    (active: boolean) => {
      cursorControls.start(
        {
          scale: active ? 0.75 : 1,
        },
        transition
      )
    },
    [cursorControls]
  )

  useImperativeHandle(
    ref,
    () => ({
      move: handleMove,
      click: handleClick,
    }),
    [handleClick, handleMove]
  )

  return (
    <motion.div
      className="absolute inset-0 will-change-transform"
      animate={containerControls}
    >
      <motion.div
        className="inline-block"
        initial="hidden"
        exit="hidden"
        animate={cursorControls}
        variants={variants}
      >
        {cursorFinger}
      </motion.div>
    </motion.div>
  )
})

Cursor.displayName = "Cursor"

export default Cursor
