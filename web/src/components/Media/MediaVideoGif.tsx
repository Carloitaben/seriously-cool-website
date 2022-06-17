import type { FC } from "react"
import { useState, useEffect, useRef } from "react"
import type { SanityFileAsset } from "@sanity/asset-utils"
import { motion, MotionConfig, useIsomorphicLayoutEffect } from "framer-motion"

import type { MediaVideo } from "~/types"
import { lightboxTransition } from "~/utils"

import type { MediaComponentSharedProps } from "./Media"
import { borderRadius } from "./Media"
import useAttatchVideoEvents from "./useAttatchVideoEvents"
import useLightbox from "./useLightbox"
import usePlayPauseOnIntersection from "./usePlayPauseOnIntersection"
import Lightbox from "./Lightbox"

type Props = Omit<MediaVideo, "__typename" | "_key" | "_type"> &
  MediaComponentSharedProps

const MediaVideoGif: FC<Props> = ({
  alt,
  asset: assetProp,
  className = "",
  enableLightbox,
  intersecting,
  load,
  onLoad,
  height,
  width,
}) => {
  const [asset, setAsset] = useState<SanityFileAsset>()
  const videoCurrentTime = useRef(0)
  const ref = useRef<HTMLVideoElement>(null)
  const lightboxVideoRef = useRef<HTMLVideoElement>(null)

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

  useAttatchVideoEvents(ref, { onLoad })
  usePlayPauseOnIntersection(ref, { intersecting, autoplay: true })

  function onVideoClick() {
    if (enableLightbox) {
      setLightbox(true)
    }

    if (ref.current) {
      videoCurrentTime.current = ref.current.currentTime
    }
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

    if (!renderLightbox && ref.current) {
      ref.current.currentTime = videoCurrentTime.current
    }
  }, [renderLightbox])

  return (
    <MotionConfig transition={lightboxTransition}>
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
            style={borderRadius}
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
          style={borderRadius}
        >
          {asset && (
            <source src={asset.url} type={`video/${asset.extension}`} />
          )}
        </motion.video>
      </Lightbox>
    </MotionConfig>
  )
}

export default MediaVideoGif
