import type { FC } from "react"
import { useState, useEffect, useRef } from "react"
import type { SanityFileAsset } from "@sanity/asset-utils"
import { motion, MotionConfig } from "framer-motion"

import type { MediaVideo } from "~/types"
import { lightboxTransition } from "~/utils"

import type { MediaComponentSharedProps } from "./Media"
import { borderRadius } from "./Media"
import useAttatchVideoEvents from "./useAttatchVideoEvents"
import usePlayPauseOnIntersection from "./usePlayPauseOnIntersection"
import useLightbox from "./useLightbox"
import VideoControls from "./VideoControls"

type Props = Omit<MediaVideo, "__typename" | "_key" | "_type"> &
  MediaComponentSharedProps

const MediaVideoGif: FC<Props> = ({
  alt,
  asset: assetProp,
  className = "",
  intersecting,
  load,
  onLoad,
  height,
  width,
  enableLightbox,
}) => {
  const [asset, setAsset] = useState<SanityFileAsset>()
  const ref = useRef<HTMLVideoElement>(null)

  const {
    toggleLightbox,
    renderLightbox,
    verticalLightboxImage,
    wrapperProps,
  } = useLightbox({
    width,
    height,
    enableLightbox,
  })

  // Load asset
  useEffect(() => {
    if (load) setAsset(assetProp)
  }, [assetProp, load])

  useAttatchVideoEvents(ref, { onLoad })
  usePlayPauseOnIntersection(ref, { intersecting, autoplay: false })

  function onTap() {
    const element = ref.current
    if (!element) return

    toggleLightbox()
    element.paused ? element.play() : element.pause()
  }

  return (
    <MotionConfig transition={lightboxTransition}>
      <div
        className={`${className} ${renderLightbox ? "" : "relative"}`}
        style={{ paddingBottom: `${(height / width) * 100}%` }}
      >
        <motion.div {...wrapperProps}>
          <motion.div
            layout
            style={borderRadius}
            className={`overflow-hidden ${
              renderLightbox && verticalLightboxImage ? "h-full" : "w-full"
            }`}
          >
            <motion.video
              ref={ref}
              title={alt}
              layout
              loop
              playsInline
              onTap={onTap}
              className="pointer-events-auto h-full w-full object-contain"
            >
              {asset && (
                <source src={asset.url} type={`video/${asset.extension}`} />
              )}
            </motion.video>
            <VideoControls video={ref} />
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  )
}

export default MediaVideoGif
