import { forwardRef } from "react"

import type { MediaVideo } from "~/types"

import type { MediaComponentSharedProps } from "./Media"

type Props = Omit<MediaVideo, "__typename" | "_key" | "_type"> &
  MediaComponentSharedProps

const MediaVideoPlayer = forwardRef<HTMLDivElement, Props>(
  ({ className }, ref) => {
    return <div ref={ref} />
  }
)

MediaVideoPlayer.displayName = "MediaVideoPlayer"

export default MediaVideoPlayer
