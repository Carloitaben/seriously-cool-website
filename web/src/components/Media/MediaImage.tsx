import type { FC } from "react"
import { useEffect, useRef, useState } from "react"
import { motion, MotionConfig } from "framer-motion"

import type { MediaImage as MediaImageProps } from "~/types"
import { getSanityImageSource, lightboxTransition } from "~/utils"

import type { MediaComponentSharedProps } from "./Media"
import { borderRadius } from "./Media"
import useLightbox from "./useLightbox"

type Props = Pick<MediaImageProps, "image" | "alt"> & MediaComponentSharedProps

const MediaImage: FC<Props> = ({
  image,
  alt,
  load,
  onLoad,
  className = "",
}) => {
  const { height, width } = image.asset.metadata.dimensions

  const [url, setUrl] = useState<string>()
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (load) {
      const src = getSanityImageSource(image).auto("format")
      const url = src.url()
      setUrl(url)
    }
  }, [image, load, onLoad])

  const {
    toggleLightbox,
    renderLightbox,
    verticalLightboxImage,
    wrapperProps,
  } = useLightbox({
    width,
    height,
  })

  return (
    <MotionConfig transition={lightboxTransition}>
      <div
        className={renderLightbox ? "" : "relative"}
        style={{ paddingBottom: `${(height / width) * 100}%` }}
      >
        <motion.div {...wrapperProps}>
          <motion.img
            layout
            ref={ref}
            src={url}
            alt={alt}
            onTap={toggleLightbox}
            onLoad={onLoad}
            style={borderRadius}
            draggable={false}
            className={`${className} pointer-events-auto object-contain ${
              renderLightbox && verticalLightboxImage ? "h-full" : "w-full"
            }`}
          />
        </motion.div>
      </div>
    </MotionConfig>
  )
}

export default MediaImage
