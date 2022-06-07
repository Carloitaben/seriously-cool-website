import type { FC } from "react"

import type { MediaVideo } from "~/types"

import type { MediaComponentSharedProps } from "./Media"

type Props = Omit<MediaVideo, "__typename" | "_key" | "_type"> &
  MediaComponentSharedProps

const MediaVideoPlayer: FC<Props> = ({ className = "" }) => {
  return <div />
}

export default MediaVideoPlayer
