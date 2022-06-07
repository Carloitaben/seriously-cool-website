import type { FC } from "react"

import type { Media as MediaProps } from "~/types"

import MediaImage from "./MediaImage"
import MediaVideoGif from "./MediaVideoGif"
import MediaVideoPlayer from "./MediaVideoPlayer"

/**
 * Media component exposed props
 */
export type MediaComponentSharedProps = {
  intersecting: boolean
  load: boolean
  onLoad?: () => void
  className?: string
  enableLightbox?: boolean
}

const Media: FC<
  Pick<MediaProps, "kind" | "image" | "video"> & MediaComponentSharedProps
> = ({ kind, image, video, ...props }) => {
  switch (kind) {
    case "IMAGE":
      return <MediaImage {...props} {...image} />
    case "VIDEO_GIF":
      return <MediaVideoGif {...props} {...video} />
    case "VIDEO_PLAYER":
      return <MediaVideoPlayer {...props} {...video} />
    default:
      throw Error(`Unsupported media kind: ${kind}`)
  }
}

export default Media
