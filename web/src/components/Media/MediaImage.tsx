import { forwardRef, useEffect, useState } from "react"
import type { Transition, Variants } from "framer-motion"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"

import type { MediaImage as MediaImageProps } from "~/types"
import { getSanityImageSource } from "~/utils"
import Portal from "~/components/Portal"

import type { MediaComponentSharedProps } from "./Media"
import useLightbox from "./useLightbox"

type Props = Pick<MediaImageProps, "image" | "alt"> & MediaComponentSharedProps

const variants = {
  hide: {
    "--tw-bg-opacity": 0,
  },
  show: {
    "--tw-bg-opacity": 0.75,
  },
}

const transition: Transition = { type: "spring", bounce: 0, duration: 0.5 }

const MediaImage = forwardRef<HTMLImageElement, Props>(
  ({ image, alt, load, onLoad, className }, ref) => {
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
      })

    return (
      <MotionConfig transition={transition}>
        <div
          className="relative"
          style={{ paddingBottom: `${(height / width) * 100}%` }}
        >
          {!renderLightbox && (
            <motion.img
              layoutId={`lightbox-img-${lightboxId}`}
              ref={ref}
              src={url}
              alt={alt}
              className={`${className} absolute inset-0 h-full w-full`}
              onClick={() => setLightbox(true)}
            />
          )}
        </div>
        <AnimatePresence>
          {renderLightbox && (
            <Portal>
              <motion.div
                className="fixed inset-0 bg-black p-4"
                initial="hide"
                animate="show"
                exit="hide"
                variants={variants as Variants}
                onClick={() => setLightbox(false)}
              >
                <div className="flex h-full items-center justify-center">
                  <motion.img
                    layoutId={`lightbox-img-${lightboxId}`}
                    ref={ref}
                    src={url}
                    alt={alt}
                    className={`${verticalLightboxImage ? "h-full" : "w-full"}`}
                  />
                </div>
              </motion.div>
            </Portal>
          )}
        </AnimatePresence>
      </MotionConfig>
    )
  }
)

MediaImage.displayName = "MediaImage"

export default MediaImage
