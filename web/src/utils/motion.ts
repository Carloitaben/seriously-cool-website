import type { Transition } from "framer-motion"

export const layoutTransitionProp: Transition = {
  type: "tween",
  ease: [0.76, 0, 0.24, 1],
  duration: 1,
}

export const lightboxTransition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.5,
}