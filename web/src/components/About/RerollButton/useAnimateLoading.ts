import type { AnimationControls } from "framer-motion"
import type { MutableRefObject } from "react"
import { useEffect } from "react"

import type { HoverPosition } from "./utils"
import { transition } from "./utils"

export default function useAnimateLoading({
  loading,
  controls,
  lastHoverPosition,
}: {
  loading: boolean
  controls: AnimationControls
  lastHoverPosition: MutableRefObject<HoverPosition | undefined>
}) {
  useEffect(() => {
    if (loading) {
      const { x = 0, y = 0 } = lastHoverPosition.current || {}

      controls.start({
        rotateX: [x, x + 360],
        rotateY: [y, y + 360],
        transition: {
          duration: 0.75,
          type: "tween",
          ease: "linear",
          repeat: Infinity,
        },
      })
    } else {
      controls.start({
        rotateX: lastHoverPosition.current?.x || 0,
        rotateY: lastHoverPosition.current?.y || 0,
        transition,
      })
    }
  }, [controls, lastHoverPosition, loading])
}
