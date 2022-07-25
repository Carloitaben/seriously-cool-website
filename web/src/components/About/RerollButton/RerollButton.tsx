import { Link } from "@remix-run/react"
import type { FC } from "react"
import { useCallback, useRef, useEffect, useState } from "react"
import { motion, transform, useAnimation } from "framer-motion"

import {
  diceFace1,
  diceFace2,
  diceFace3,
  diceFace4,
  diceFace5,
  diceFace6,
} from "~/components/Svg"

import type { HoverPosition } from "./utils"
import { transition } from "./utils"

import useIsLoading from "./useIsLoading"
import useCanHover from "./useCanHover"
import useAnimateLoading from "./useAnimateLoading"

const transformOffsetX = transform([0, 64], [-55, 55])
const transformOffsetY = transform([0, 64], [55, -55])

const RerollButton: FC = () => {
  const [hovering, setHovering] = useState(false)
  const lastHoverPosition = useRef<HoverPosition>()
  const ref = useRef<HTMLAnchorElement>(null)

  const controls = useAnimation()
  const canHover = useCanHover()
  const { onClick, loading } = useIsLoading()

  useAnimateLoading({ loading, controls, lastHoverPosition })

  useEffect(() => {
    const element = ref.current

    function handleMouseMove(event: MouseEvent) {
      const x = transformOffsetY(event.offsetY)
      const y = transformOffsetX(event.offsetX)
      lastHoverPosition.current = { x, y }

      if (!loading) {
        controls.start({
          rotateX: x,
          rotateY: y,
          transition,
        })
      }
    }

    if (hovering && element && canHover) {
      element.addEventListener("mousemove", handleMouseMove, true)
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove, true)
      }
    }
  }, [canHover, controls, hovering, loading])

  const onMouseEnter = useCallback(() => {
    setHovering(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    lastHoverPosition.current = undefined
    setHovering(false)

    if (!loading) {
      controls.start({
        rotateX: 0,
        rotateY: 0,
        transition,
      })
    }
  }, [controls, loading])

  return (
    <Link
      to="."
      ref={ref}
      className="desktop:h-16 desktop:w-16 flex h-12 w-12 items-center justify-center rounded-full border-2 border-current"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="dice-wrapper pointer-events-none">
        <motion.div className="dice relative h-full w-full" animate={controls}>
          <div className="dice-face-top bg-text absolute inset-0">
            {diceFace1}
          </div>
          <div className="dice-face-back bg-text absolute inset-0">
            {diceFace2}
          </div>
          <div className="dice-face-left bg-text absolute inset-0">
            {diceFace3}
          </div>
          <div className="dice-face-right bg-text absolute inset-0">
            {diceFace4}
          </div>
          <div className="dice-face-front bg-text absolute inset-0">
            {diceFace5}
          </div>
          <div className="dice-face-bottom bg-text absolute inset-0">
            {diceFace6}
          </div>
        </motion.div>
      </div>
    </Link>
  )
}

export default RerollButton
