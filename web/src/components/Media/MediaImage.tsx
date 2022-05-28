import { forwardRef, useEffect, useState } from "react"

import type { MediaImage as MediaImageProps } from "~/types"
import { getSanityImageSource } from "~/utils"

import type { MediaComponentSharedProps } from "./Media"

type Props = Pick<MediaImageProps, "image" | "alt"> & MediaComponentSharedProps

const MediaImage = forwardRef<HTMLImageElement, Props>(
  ({ image, alt, load, onLoad, className }, ref) => {
    const { height, width } = image.asset.metadata.dimensions

    const [url, setUrl] = useState<string>()

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
      >
        <img
          ref={ref}
          src={url}
          alt={alt}
          className={`${className} absolute inset-0`}
        />
      </div>
    )
  }
)

MediaImage.displayName = "MediaImage"

export default MediaImage
