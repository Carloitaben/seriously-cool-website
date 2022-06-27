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
          <motion.video
            ref={ref}
            title={alt}
            layout
            loop
            playsInline
            onTap={onTap}
            style={borderRadius}
            className={`pointer-events-auto object-contain ${
              renderLightbox && verticalLightboxImage ? "h-full" : "w-full"
            }`}
          >
            {asset && (
              <source src={asset.url} type={`video/${asset.extension}`} />
            )}
          </motion.video>
        </motion.div>
      </div>
    </MotionConfig>
  )
}

export default MediaVideoGif
