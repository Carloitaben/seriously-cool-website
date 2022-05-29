import { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import type { Variants } from "framer-motion"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"

import type { MediaImage as MediaImageProps } from "~/types"
import { getSanityImageSource } from "~/utils"
import useOnWindowResize from "~/hooks/useOnWindowResize"
import Portal from "~/components/Portal"

import type { MediaComponentSharedProps } from "./Media"

type Props = Pick<MediaImageProps, "image" | "alt"> & MediaComponentSharedProps

const variants = {
  hide: {
    "--tw-bg-opacity": 0,
  },
  show: {
    "--tw-bg-opacity": 0.75,
  },
}

const MediaImage = forwardRef<HTMLImageElement, Props>(
  ({ image, alt, load, onLoad, className }, ref) => {
    const { height, width } = image.asset.metadata.dimensions

    const uuid = useRef(Math.random().toString())
    const [url, setUrl] = useState<string>()
    const [lightbox, setLightbox] = useState(false)
    const [verticalLightboxImage, setVerticalLightboxImage] =
      useState<boolean>()

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

    const onWindowResize = useCallback(() => {
      const windowAspectRatio = window.innerHeight / window.innerWidth
      const imageAspectRatio = height / width
      setVerticalLightboxImage(windowAspectRatio < imageAspectRatio)
    }, [height, width])

    useOnWindowResize(onWindowResize, {
      disable: !lightbox,
    })

    const renderLightbox =
      lightbox && typeof verticalLightboxImage === "boolean"

    return (
      <MotionConfig transition={{ type: "spring", mass: 0.65 }}>
        <div
          className="relative"
          style={{ paddingBottom: `${(height / width) * 100}%` }}
        >
          {!renderLightbox && (
            <motion.img
              layoutId={`lightbox-img-${uuid.current}`}
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
                    layoutId={`lightbox-img-${uuid.current}`}
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
