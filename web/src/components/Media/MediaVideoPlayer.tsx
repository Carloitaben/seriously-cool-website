import type { FC } from "react"
import { useState, useEffect, useRef } from "react"
import { motion, MotionConfig } from "framer-motion"
import type { SanityFileAsset } from "@sanity/asset-utils"
import { useFocusTrap } from "@mantine/hooks"

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

  const focusTrapRef = useFocusTrap(renderLightbox)

  useEffect(() => {
    if (!ref.current) return

    if (renderLightbox && ref.current.paused) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
  }, [renderLightbox])

  return (
    <MotionConfig transition={lightboxTransition}>
      <div
        ref={focusTrapRef}
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
              onTap={toggleLightbox}
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
