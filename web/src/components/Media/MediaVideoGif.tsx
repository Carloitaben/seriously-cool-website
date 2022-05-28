import { forwardRef, useState, useEffect } from "react"
import type { SanityFileAsset } from "@sanity/asset-utils"

import type { MediaVideo } from "~/types"

import type { MediaComponentSharedProps } from "./Media"

type Props = Omit<MediaVideo, "__typename" | "_key" | "_type"> &
  MediaComponentSharedProps

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

    // Load asset
    useEffect(() => {
      if (load) setAsset(assetProp)
    }, [assetProp, load])

    // Handle play/pause when intersecting
    useEffect(() => {
      if (typeof ref === "function" || !ref) return
      if (!ref.current) return

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
      if (typeof ref === "function" || !ref) return
      if (!ref.current) return

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
      <div
        className={`${className} relative w-full overflow-hidden`}
        style={{ paddingBottom: `${(height / width) * 100}%` }}
      >
        <video
          className="absolute inset-0 h-full w-full"
          ref={ref}
          title={alt}
          loop
          muted
          playsInline
        >
          {asset && (
            <source src={asset.url} type={`video/${asset.extension}`} />
          )}
        </video>
      </div>
    )
  }
)

MediaVideoGif.displayName = "MediaVideoGif"

export default MediaVideoGif
