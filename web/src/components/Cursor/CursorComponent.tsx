import type { FC } from "react"
import { useCallback, useEffect, useRef } from "react"
import type { Transition, Variants } from "framer-motion"
import { motion, useAnimation, useAnimationFrame } from "framer-motion"

import { lerpDelta } from "./utils"

type Props = {
  cursor: JSX.Element
}

type Position = {
  x: number
  y: number
}

const variants: Variants = {
  hidden: {
    scale: 0,
  },
}

const transition: Transition = {
  type: "spring",
  mass: 0.02,
}

const LERP_PERCENTAGE = 0.3

const CursorComponent: FC<Props> = ({ cursor }) => {
  const last = useRef(0)
  const lerpPosition = useRef<Position>()
  const position = useRef<Position>()
  const ref = useRef<HTMLDivElement>(null)

  const controls = useAnimation()

  const handleClick = useCallback(
    (active: boolean, forceTouch: boolean) => {
      controls.start(
        {
          scale: active ? (forceTouch ? 0.8 : 0.9) : 1,
        },
        transition
      )
    },
    [controls]
  )

  useEffect(() => {
    function onMouseMove({ clientX, clientY }: MouseEvent) {
      position.current = {
        x: (clientX * 100) / window.innerWidth,
        y: (clientY * 100) / window.innerHeight,
      }
    }

    function handleForceTouchUp() {
      handleClick(false, true)
    }

    function handleForceTouchDown() {
      handleClick(true, true)
    }

    function handleMouseUp() {
      handleClick(false, false)
    }

    function handleMouseDown() {
      handleClick(true, false)
    }

    window.addEventListener("webkitmouseforceup", handleForceTouchUp, true)
    window.addEventListener("webkitmouseforcedown", handleForceTouchDown, true)
    window.addEventListener("mouseup", handleMouseUp, true)
    window.addEventListener("mousedown", handleMouseDown, true)
    window.addEventListener("mousemove", onMouseMove, true)
    return () => {
      window.addEventListener("webkitmouseforceup", handleForceTouchUp, true)
      window.addEventListener(
        "webkitmouseforcedown",
        handleForceTouchDown,
        true
      )
      window.addEventListener("mouseup", handleMouseUp, true)
      window.addEventListener("mousedown", handleMouseDown, true)
      window.removeEventListener("mousemove", onMouseMove, true)
    }
  }, [handleClick])

  useAnimationFrame((time) => {
    const delta = (time - last.current) / 1000
    last.current = time

    if (!position.current || !ref.current) return

    if (!lerpPosition.current) {
      lerpPosition.current = position.current
      controls.start({ scale: 1 }, transition)
    }

    if (lerpPosition.current) {
      lerpPosition.current = {
        x: lerpDelta(
          lerpPosition.current.x,
          position.current.x,
          LERP_PERCENTAGE,
          delta
        ),
        y: lerpDelta(
          lerpPosition.current.y,
          position.current.y,
          LERP_PERCENTAGE,
          delta
        ),
      }
    }

    ref.current.style.transform = `translate(${lerpPosition.current.x}%, ${lerpPosition.current.y}%)`
  })

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
      <div ref={ref} className="absolute inset-0 will-change-transform">
        <motion.div
          initial="hidden"
          exit="hidden"
          animate={controls}
          variants={variants}
          className="inline-block"
        >
          {cursor}
        </motion.div>
      </div>
    </div>
  )
}

export default CursorComponent
