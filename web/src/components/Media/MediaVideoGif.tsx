import { forwardRef, useState, useEffect, useRef } from "react"
import type { SanityFileAsset } from "@sanity/asset-utils"
import type { Transition } from "framer-motion"
import { motion, MotionConfig, useIsomorphicLayoutEffect } from "framer-motion"

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
      alt,
      asset: assetProp,
      className,
      enableLightbox,
      intersecting,
      load,
      onLoad,
      height,
      width,
    },
    ref
  ) => {
    const [asset, setAsset] = useState<SanityFileAsset>()
    const lightboxVideoRef = useRef<HTMLVideoElement>(null)
    const videoCurrentTime = useRef(0)

    const { lightboxId, setLightbox, renderLightbox, verticalLightboxImage } =
      useLightbox({
        width,
        height,
        enableLightbox,
      })

    // Load asset
    useEffect(() => {
      if (load) setAsset(assetProp)
    }, [assetProp, load])

    // Handle play/pause when intersecting
    useEffect(() => {
      if (typeof ref === "function" || !ref || !ref.current) return

      if (intersecting) {
        ref.current.paused && ref.current.play()
      } else {
        !ref.current.paused && ref.current.pause()
      }
    }, [load, assetProp, ref, intersecting])

    // Attatch events
    useEffect(() => {
      if (typeof ref === "function" || !ref || !ref.current) return

      const element = ref.current

      if (element && onLoad) {
        element.addEventListener("canplay", onLoad)
      }

      return () => {
        if (element && onLoad) {
          element.removeEventListener("canplay", onLoad)
        }
      }
    }, [onLoad, ref])

    function onVideoClick() {
      if (enableLightbox) setLightbox(true)

      if (typeof ref === "function" || !ref || !ref.current) return
      videoCurrentTime.current = ref.current.currentTime
    }

    function onLightboxClick() {
      setLightbox(false)

      if (!lightboxVideoRef.current) return
      videoCurrentTime.current = lightboxVideoRef.current.currentTime
    }

    // Sync currentTime betweeen videos
    useIsomorphicLayoutEffect(() => {
      if (renderLightbox && lightboxVideoRef.current) {
        lightboxVideoRef.current.currentTime = videoCurrentTime.current
      }

      if (!renderLightbox && typeof ref !== "function" && ref && ref.current) {
        ref.current.currentTime = videoCurrentTime.current
      }
    }, [ref, renderLightbox])

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
              onClick={onVideoClick}
            >
              {asset && (
                <source src={asset.url} type={`video/${asset.extension}`} />
              )}
            </motion.video>
          )}
        </div>
        <Lightbox renderLightbox={renderLightbox} onClose={onLightboxClick}>
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
