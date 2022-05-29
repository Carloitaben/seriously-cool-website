import { forwardRef, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import type { MediaImage as MediaImageProps } from "~/types"
import { getSanityImageSource } from "~/utils"
import Portal from "../Portal"

import type { MediaComponentSharedProps } from "./Media"

type Props = Pick<MediaImageProps, "image" | "alt"> & MediaComponentSharedProps

const MediaImage = forwardRef<HTMLImageElement, Props>(
  ({ image, alt, load, onLoad, className }, ref) => {
    const { height, width } = image.asset.metadata.dimensions

    const uuid = useRef(Math.random().toString())
    const [url, setUrl] = useState<string>()
    const [lightbox, setLightbox] = useState(false)

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

    return (
      <div
        className="relative"
        style={{ paddingBottom: `${(height / width) * 100}%` }}
        onClick={() => setLightbox((value) => !value)}
      >
        {!lightbox && (
          <motion.img
            layoutId={`lightbox-img-${uuid.current}`}
            ref={ref}
            src={url}
            alt={alt}
            className={`${className} pointer-events-none absolute inset-0`}
          />
        )}
        <AnimatePresence>
          {lightbox && (
            <Portal>
              <motion.div className="fixed inset-0 p-4">
                <div className="flex h-full items-center justify-center">
                  <motion.img
                    layoutId={`lightbox-img-${uuid.current}`}
                    ref={ref}
                    src={url}
                    alt={alt}
                    className={`pointer-events-none ${
                      height / width > 1 ? "" : ""
                    }`}
                  />
                </div>
              </motion.div>
            </Portal>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

MediaImage.displayName = "MediaImage"

export default MediaImage
