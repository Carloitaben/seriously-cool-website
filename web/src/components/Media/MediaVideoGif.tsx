// import type { FC } from "react"
// import { useState, useEffect, useRef } from "react"
// import type { SanityFileAsset } from "@sanity/asset-utils"
// import { motion, MotionConfig, useIsomorphicLayoutEffect } from "framer-motion"

// import type { MediaVideo } from "~/types"
// import { lightboxTransition } from "~/utils"

// import type { MediaComponentSharedProps } from "./Media"
import useLightbox from "./useLightbox"
import Lightbox from "./Lightbox"

// type Props = Omit<MediaVideo, "__typename" | "_key" | "_type"> &
//   MediaComponentSharedProps

// const MediaVideoGif: FC<Props> = ({
//   alt,
//   asset: assetProp,
//   className = "",
//   enableLightbox,
//   intersecting,
//   load,
//   onLoad,
//   height,
//   width,
// }) => {
//   const [asset, setAsset] = useState<SanityFileAsset>()

//   const { lightboxId, setLightbox, renderLightbox, verticalLightboxImage } =
//     useLightbox({
//       width,
//       height,
//       enableLightbox,
//     })

//   // Load asset
//   useEffect(() => {
//     if (load) setAsset(assetProp)
//   }, [assetProp, load])

//   // Handle play/pause when intersecting
//   useEffect(() => {
//     if (!ref.current) return

//     if (intersecting) {
//       ref.current.paused && ref.current.play()
//     } else {
//       !ref.current.paused && ref.current.pause()
//     }
//   }, [intersecting])

//   // Attatch events
//   useEffect(() => {
//     const element = ref.current

//     if (element && onLoad) {
//       element.addEventListener("loadeddata", onLoad)
//     }

//     return () => {
//       if (element && onLoad) {
//         element.removeEventListener("loadeddata", onLoad)
//       }
//     }
//   }, [onLoad])

//   // Sync currentTime betweeen videos
//   useIsomorphicLayoutEffect(() => {
//     if (renderLightbox && lightboxVideoRef.current) {
//       lightboxVideoRef.current.currentTime = videoCurrentTime.current
//     }

//     if (!renderLightbox && ref.current) {
//       ref.current.currentTime = videoCurrentTime.current
//     }
//   }, [renderLightbox])

//   return (
//     <MotionConfig transition={lightboxTransition}>
//       <div
//         className={`${className} relative`}
//         style={{ paddingBottom: `${(height / width) * 100}%` }}
//       >
//         {!renderLightbox && (
//           <motion.video
//             layoutId={lightboxId}
//             ref={ref}
//             title={alt}
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="absolute inset-0 h-full w-full"
//             onClick={onVideoClick}
//           >
//             {asset && (
//               <source src={asset.url} type={`video/${asset.extension}`} />
//             )}
//           </motion.video>
//         )}
//       </div>

//   )
// }

// export default MediaVideoGif

import type { FC } from "react"
import { useState, useEffect, useRef } from "react"
import { LayoutGroup, motion, MotionConfig } from "framer-motion"
import type { SanityFileAsset } from "@sanity/asset-utils"

import type { MediaVideo } from "~/types"

import type { MediaComponentSharedProps } from "./Media"
import usePlayPauseOnIntersection from "./usePlayPauseOnIntersection"
import useAttatchVideoEvents from "./useAttatchVideoEvents"

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
  color,
}) => {
  const [asset, setAsset] = useState<SanityFileAsset>(load && assetProp)
  const ref = useRef<HTMLVideoElement>(null)
  const lightboxVideoRef = useRef<HTMLVideoElement>(null)
  const videoCurrentTime = useRef(0)

  // Load asset
  useEffect(() => {
    if (load) setAsset(assetProp)
  }, [assetProp, load])

  const { lightboxId, setLightbox, renderLightbox, verticalLightboxImage } =
    useLightbox({
      width,
      height,
      enableLightbox,
    })

  usePlayPauseOnIntersection(ref, { intersecting, autoplay: true })
  useAttatchVideoEvents(ref, { onLoad })

  function onLightboxClick() {
    setLightbox(false)

    if (!lightboxVideoRef.current) return
    videoCurrentTime.current = lightboxVideoRef.current.currentTime
  }

  function onVideoClick() {
    if (enableLightbox) {
      setLightbox(true)
    }

    // if (ref.current) {
    //   videoCurrentTime.current = ref.current.currentTime
    // }
  }

  return (
    <LayoutGroup id={asset.assetId}>
      <div
        className={`${className} relative`}
        style={{ paddingBottom: `${(height / width) * 100}%` }}
      >
        {!renderLightbox && (
          <motion.video
            layoutId={lightboxId || undefined}
            ref={ref}
            title={alt}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full"
            onClick={onVideoClick}
            style={{ background: color.hex }}
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
    </LayoutGroup>
  )
}

export default MediaVideoGif
