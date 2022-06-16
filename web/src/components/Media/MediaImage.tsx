import type { FC } from "react"
import { useEffect, useRef, useState } from "react"
import { motion, MotionConfig } from "framer-motion"

import type { MediaImage as MediaImageProps } from "~/types"
import { getSanityImageSource, lightboxTransition } from "~/utils"

import type { MediaComponentSharedProps } from "./Media"
import { borderRadius } from "./Media"
import useLightbox from "./useLightbox"
import Lightbox from "./Lightbox"

type Props = Pick<MediaImageProps, "image" | "alt"> & MediaComponentSharedProps

const MediaImage: FC<Props> = ({
  image,
  alt,
  load,
  onLoad,
  className = "",
  enableLightbox,
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

  const { lightboxId, setLightbox, renderLightbox, verticalLightboxImage } =
    useLightbox({
      width,
      height,
      enableLightbox,
    })

  return (
    <MotionConfig transition={lightboxTransition}>
      <div
        className="relative"
        style={{ paddingBottom: `${(height / width) * 100}%` }}
      >
        {!renderLightbox && (
          <motion.img
            layoutId={lightboxId}
            ref={ref}
            src={url}
            alt={alt}
            onLoad={onLoad}
            className={`${className} absolute inset-0 h-full w-full`}
            onClick={() => enableLightbox && setLightbox(true)}
            style={borderRadius}
          />
        )}
      </div>
      <Lightbox
        renderLightbox={renderLightbox}
        onClose={() => setLightbox(false)}
      >
        <motion.img
          layoutId={lightboxId}
          ref={ref}
          src={url}
          alt={alt}
          className={`${verticalLightboxImage ? "h-full" : "w-full"}`}
        />
      </Lightbox>
    </MotionConfig>
  )
}

export default MediaImage
