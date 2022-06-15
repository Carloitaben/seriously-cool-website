import { useCallback, useRef, useState } from "react"

import useOnWindowResize from "~/hooks/useOnWindowResize"

export default function useLightbox({
  width,
  height,
  enableLightbox,
}: {
  width: number
  height: number
  enableLightbox?: boolean
}) {
  const id = useRef(Math.random().toString())

  const [verticalLightboxImage, setVerticalLightboxImage] = useState<boolean>()
  const [lightbox, setLightbox] = useState(false)

  const onWindowResize = useCallback(() => {
    const windowAspectRatio = window.innerHeight / window.innerWidth
    const imageAspectRatio = height / width
    setVerticalLightboxImage(windowAspectRatio < imageAspectRatio)
  }, [height, width])

  useOnWindowResize(onWindowResize, {
    disable: !lightbox || !enableLightbox,
  })

  const renderLightbox = lightbox && typeof verticalLightboxImage === "boolean"

  return {
    lightboxId: enableLightbox ? `lightbox-${id.current}` : undefined,
    setLightbox,
    renderLightbox,
    verticalLightboxImage,
  }
}
