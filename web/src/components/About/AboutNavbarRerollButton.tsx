import { Link } from "@remix-run/react"
import type { FC } from "react"
import { useRef, useEffect, useState } from "react"
import type { Transition } from "framer-motion"
import { motion, transform, useAnimation } from "framer-motion"

import {
  diceFace1,
  diceFace2,
  diceFace3,
  diceFace4,
  diceFace5,
  diceFace6,
} from "~/components/Svg"

const transformOffsetX = transform([0, 64], [-25, 25])
const transformOffsetY = transform([0, 64], [25, -25])

const hoverSpring: Transition = {
  type: "spring",
  mass: 0.5,
  stiffness: 200,
}

const AboutNavbarRerollButton: FC = () => {
  const [hovering, setHovering] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

  const controls = useAnimation()

  useEffect(() => {
    const element = ref.current

    function handleMouseMove(event: MouseEvent) {
      controls.start({
        rotateX: transformOffsetY(event.offsetY),
        rotateY: transformOffsetX(event.offsetX),
        transition: hoverSpring,
      })
    }

    if (hovering && element) {
      element.addEventListener("mousemove", handleMouseMove, true)
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove, true)
      }
    }
  }, [controls, hovering])

  function handleMouseEnter() {
    setHovering(true)
  }

  function handleMouseLeave() {
    setHovering(false)
    controls.start({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      transition: hoverSpring,
    })
  }

  function onLinkClick() {
    console.log("clicked on link")
  }

  return (
    <Link
      to="."
      ref={ref}
      className="desktop:h-16 desktop:w-16 flex h-12 w-12 items-center justify-center rounded-full border-2 border-current"
      onClick={onLinkClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

export default AboutNavbarRerollButton
