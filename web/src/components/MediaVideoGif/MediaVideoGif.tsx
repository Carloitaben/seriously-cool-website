import type { SanityFileAsset } from "@sanity/asset-utils"
import type { FC } from "react"
import { useState } from "react"
import { useRef, useEffect } from "react"

import useIntersectionObserver from "~/hooks/useIntersectionObserver"
import type { MediaVideo } from "~/types"

type Props = Omit<MediaVideo, "__typename" | "_key" | "_type"> & {
  className?: string
  /**
   * Used to programatically control the intersection state
   */
  intersecting?: boolean
  onLoad?: () => void
}

const MediaVideoGif: FC<Props> = ({
  className = "",
  width,
  height,
  alt,
  onLoad,
  mp4,
  asset: assetProp,
  intersecting: intersectingProp,
}) => {
  const video = useRef<HTMLVideoElement>(null)
  const [asset, setAsset] = useState<SanityFileAsset>()

  // Create the Intersection Observer only if the `intersecting` prop is not used
  const intersecting = useIntersectionObserver(video, {
    disconnect: typeof intersectingProp !== "undefined",
  })

  useEffect(() => {
    if (!video.current) return

    if (intersectingProp || intersecting) {
      video.current.play()
      setAsset(assetProp)
    } else {
      video.current.pause()
    }
  }, [intersectingProp, intersecting, assetProp])

  useEffect(() => {
    const element = video.current

    if (element && onLoad) {
      element.addEventListener("loadeddata", onLoad)
    }

    return () => {
      if (element && onLoad) {
        element.removeEventListener("loadeddata", onLoad)
      }
    }
  }, [onLoad])

  return (
    <div
      data-intersecting={intersectingProp}
      className={`${className} w-full relative overflow-hidden`}
      style={{ paddingBottom: `${(height / width) * 100}%` }}
    >
      <video
        className="absolute inset-0 w-full h-full"
        ref={video}
        title={alt}
        loop
        muted
        playsInline
      >
        {asset && <source src={asset.url} type={`video/${asset.extension}`} />}
      </video>
    </div>
  )
}

export default MediaVideoGif
