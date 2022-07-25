import type { Transition } from "framer-motion"

export const transition: Transition = {
  type: "spring",
  mass: 0.5,
  stiffness: 200,
}

export type HoverPosition = { x: number; y: number }
