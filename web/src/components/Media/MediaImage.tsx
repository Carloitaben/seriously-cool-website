import { forwardRef, useEffect, useState } from "react"

import type { MediaImage as MediaImageProps } from "~/types"
import { getSanityImageSource } from "~/utils"

import type { MediaComponentSharedProps } from "./Media"

type Props = Pick<MediaImageProps, "image" | "alt"> & MediaComponentSharedProps

const MediaImage = forwardRef<HTMLImageElement, Props>(
  ({ image, alt, load, onLoad, className }, ref) => {
    const [url, setUrl] = useState<any>()

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

    return <img ref={ref} className={className} src={url} alt={alt} />
  }
)

MediaImage.displayName = "MediaImage"

export default MediaImage
