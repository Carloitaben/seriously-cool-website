import type { RefObject } from "react"
import { useEffect } from "react"

export default function usePlayPauseOnIntersection(
  ref: RefObject<HTMLVideoElement>,
  {
    intersecting,
    autoplay,
  }: {
    intersecting: boolean
    autoplay: boolean
  }
) {
  useEffect(() => {
    const element = ref.current

    if (!element) return

    if (intersecting && autoplay && element.paused) {
      element.play().catch(() => {
        // noop
      })
    }

    if (!intersecting && !element.paused) {
      element.pause()
    }
  }, [autoplay, intersecting, ref])
}
