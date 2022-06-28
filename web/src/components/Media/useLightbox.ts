import type { MotionProps } from "framer-motion"
import type { HTMLAttributes } from "react"
import { useEffect, useCallback, useRef, useState } from "react"

import useOnKey from "~/hooks/useOnKey"
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

  useOnWindowResize(() => {
    const windowAspectRatio = window.innerHeight / window.innerWidth
    const imageAspectRatio = height / width
    setVerticalLightboxImage(windowAspectRatio < imageAspectRatio)
  }, enabled)

  useOnKey((key) => {
    if (key === "Escape") setLightboxId(null)
  }, enabled)

  useEffect(() => {
    function handleScroll() {
      setLightboxId(null)
    }

    if (enabled) window.addEventListener("scroll", handleScroll, true)
    return () => window.removeEventListener("scroll", handleScroll, true)
  }, [enabled, setLightboxId])

  const renderLightbox = enabled && typeof verticalLightboxImage === "boolean"

  const wrapperProps: MotionProps & HTMLAttributes<HTMLElement> = {
    layoutId: id.current,
    tabIndex: enabled ? 0 : undefined,
    onLayoutAnimationStart() {
      setAnimating(true)
    },
    onLayoutAnimationComplete() {
      setAnimating(false)
    },
    style: {
      zIndex: enabled || animating ? 40 : "auto",
    },
    className: `pointer-events-none focus:outline-none ${
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
