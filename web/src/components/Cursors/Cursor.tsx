import type { FC } from "react"
import { useEffect } from "react"
import type { Variants } from "framer-motion"
import { motion, useMotionTemplate, useSpring } from "framer-motion"

import { cursorFinger } from "~/components/Svg"

type Props = {
  x: number
  y: number
}

const variants: Variants = {
  hide: {
    scale: 0,
  },
  show: {
    scale: 1,
  },
}

const Cursor: FC<Props> = ({ x, y }) => {
  const xSpring = useSpring(window.innerWidth / 2, { mass: 0.25 })
  const ySpring = useSpring(window.innerHeight / 2, { mass: 0.25 })

  const xTemplate = useMotionTemplate`${xSpring}%`
  const yTemplate = useMotionTemplate`${ySpring}%`

  const style = {
    left: xTemplate,
    top: yTemplate,
  }

  useEffect(() => {
    xSpring.set(x)
    ySpring.set(y)
  }, [x, xSpring, y, ySpring])

  return (
    <motion.div
      className="absolute"
      // initial="hide"
      // animate="show"
      // exit="hide"
      // variants={variants}
      style={style}
    >
      {cursorFinger}
    </motion.div>
  )
}

export default Cursor
