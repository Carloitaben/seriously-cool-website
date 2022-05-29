import { useCallback, useRef, useState } from "react"

import useOnWindowResize from "~/hooks/useOnWindowResize"

export default function useLightbox({
  width,
  height,
}: {
  width: number
  height: number
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
    disable: !lightbox,
  })

  const renderLightbox = lightbox && typeof verticalLightboxImage === "boolean"

  return {
    lightboxId: id.current,
    setLightbox,
    renderLightbox,
    verticalLightboxImage,
  }
}
