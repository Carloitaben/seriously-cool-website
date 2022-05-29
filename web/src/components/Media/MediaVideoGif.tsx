import { forwardRef, useState, useEffect, useRef } from "react"
import type { SanityFileAsset } from "@sanity/asset-utils"
import type { Transition } from "framer-motion"
import { motion, MotionConfig } from "framer-motion"

import type { MediaVideo } from "~/types"

import type { MediaComponentSharedProps } from "./Media"
import useLightbox from "./useLightbox"
import Lightbox from "./Lightbox"

type Props = Omit<MediaVideo, "__typename" | "_key" | "_type"> &
  MediaComponentSharedProps

const transition: Transition = { type: "spring", bounce: 0, duration: 0.5 }

const MediaVideoGif = forwardRef<HTMLVideoElement, Props>(
  (
    {
      className,
      width,
      height,
      alt,
      load,
      onLoad,
      mp4,
      asset: assetProp,
      intersecting,
    },
    ref
  ) => {
    const [asset, setAsset] = useState<SanityFileAsset>()
    const lightboxVideoRef = useRef<HTMLVideoElement>(null)

    const { lightboxId, setLightbox, renderLightbox, verticalLightboxImage } =
      useLightbox({
        width,
        height,
      })

    // Load asset
    useEffect(() => {
      if (load) setAsset(assetProp)
    }, [assetProp, load])

    // Handle play/pause when intersecting
    useEffect(() => {
      if (typeof ref === "function" || !ref || !ref.current) return

      try {
        if (load) {
          ref.current.paused && ref.current.play()
        } else {
          !ref.current.paused && ref.current.pause()
        }
      } catch (error) {
        // noop
      }
    }, [load, assetProp, ref])

    // Attatch events
    useEffect(() => {
      if (typeof ref === "function" || !ref || !ref.current) return

      const element = ref.current

      if (element && onLoad) {
        element.addEventListener("loadeddata", onLoad)
      }

      return () => {
        if (element && onLoad) {
          element.removeEventListener("loadeddata", onLoad)
        }
      }
    }, [onLoad, ref])

    return (
      <MotionConfig transition={transition}>
        <div
          className={`${className} relative`}
          style={{ paddingBottom: `${(height / width) * 100}%` }}
        >
          {!renderLightbox && (
            <motion.video
              layoutId={lightboxId}
              ref={ref}
              title={alt}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full"
              onClick={() => setLightbox(true)}
            >
              {asset && (
                <source src={asset.url} type={`video/${asset.extension}`} />
              )}
            </motion.video>
          )}
        </div>
        <Lightbox renderLightbox={renderLightbox} setLightbox={setLightbox}>
          <motion.video
            layoutId={lightboxId}
            ref={lightboxVideoRef}
            title={alt}
            autoPlay
            loop
            muted
            playsInline
            className={`${verticalLightboxImage ? "h-full" : "w-full"}`}
          >
            {asset && (
              <source src={asset.url} type={`video/${asset.extension}`} />
            )}
          </motion.video>
        </Lightbox>
      </MotionConfig>
    )
  }
)

MediaVideoGif.displayName = "MediaVideoGif"

export default MediaVideoGif
