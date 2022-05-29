import { forwardRef, useEffect, useState } from "react"
import type { Transition } from "framer-motion"
import { motion, MotionConfig } from "framer-motion"

import type { MediaImage as MediaImageProps } from "~/types"
import { getSanityImageSource } from "~/utils"

import type { MediaComponentSharedProps } from "./Media"
import useLightbox from "./useLightbox"
import Lightbox from "./Lightbox"

type Props = Pick<MediaImageProps, "image" | "alt"> & MediaComponentSharedProps

const transition: Transition = { type: "spring", bounce: 0, duration: 0.5 }

const MediaImage = forwardRef<HTMLImageElement, Props>(
  ({ image, alt, load, onLoad, className, enableLightbox }, ref) => {
    const { height, width } = image.asset.metadata.dimensions

    const [url, setUrl] = useState<string>()

    useEffect(() => {
      if (load) {
        const src = getSanityImageSource(image).auto("format")
        const url = src.url()
        const img = new Image()

        img.src = url
        img.onload = () => {
          setUrl(url)
          if (onLoad) onLoad()
        }
      }
    }, [image, load, onLoad])

    const { lightboxId, setLightbox, renderLightbox, verticalLightboxImage } =
      useLightbox({
        width,
        height,
        enableLightbox,
      })

    return (
      <MotionConfig transition={transition}>
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
              className={`${className} absolute inset-0 h-full w-full`}
              onClick={() => enableLightbox && setLightbox(true)}
            />
          )}
        </div>
        <Lightbox renderLightbox={renderLightbox} setLightbox={setLightbox}>
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
)

MediaImage.displayName = "MediaImage"

export default MediaImage
