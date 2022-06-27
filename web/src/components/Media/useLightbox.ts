import type { MotionProps } from "framer-motion"
import type { HTMLAttributes } from "react"
import { useCallback, useRef, useState } from "react"

import useOnWindowResize from "~/hooks/useOnWindowResize"
import store from "~/store"

export default function useLightbox({
  width,
  height,
  enableLightbox,
}: {
  width: number
  height: number
  enableLightbox?: boolean
}) {
  const id = useRef(`lightbox-${Math.random().toString()}`)
  const [verticalLightboxImage, setVerticalLightboxImage] = useState<boolean>()
  const [animating, setAnimating] = useState(false)

  const lightboxId = store((state) => state.lightboxId)
  const setLightboxId = store((state) => state.setLightboxId)

  const enabled = lightboxId === id.current && enableLightbox

  const toggleLightbox = useCallback(() => {
    if (enableLightbox) setLightboxId(lightboxId ? null : id.current)
  }, [enableLightbox, lightboxId, setLightboxId])

  const onWindowResize = useCallback(() => {
    const windowAspectRatio = window.innerHeight / window.innerWidth
    const imageAspectRatio = height / width
    setVerticalLightboxImage(windowAspectRatio < imageAspectRatio)
  }, [height, width])

  useOnWindowResize(onWindowResize, enabled)

  const renderLightbox = enabled && typeof verticalLightboxImage === "boolean"

  const wrapperProps: MotionProps & HTMLAttributes<HTMLElement> = {
    layoutId: id.current,
    onLayoutAnimationStart() {
      setAnimating(true)
    },
    onLayoutAnimationComplete() {
      setAnimating(false)
    },
    style: {
      zIndex: enabled || animating ? 40 : "auto",
    },
    className: `pointer-events-none ${
      renderLightbox
        ? "fixed inset-4 flex items-center justify-center"
        : "absolute inset-0"
    }`,
  }

  return {
    lightboxId: id.current,
    renderLightbox,
    toggleLightbox,
    verticalLightboxImage,
    wrapperProps,
  }
}
