import type { FC } from "react"

import type { MediaVideo } from "~/types"

type Props = Omit<MediaVideo, "__typename" | "_key" | "_type"> & {
  className?: string
}

const MediaVideoGif: FC<Props> = ({
  className = "",
  width,
  height,
  alt,
  asset,
  mp4,
}) => {
  return (
    <figure
      className={`${className} w-full relative overflow-hidden`}
      style={{ paddingBottom: `${(height / width) * 100}%` }}
    >
      <video
        className="absolute inset-0 w-full h-full"
        title={alt}
        loop
        muted
        autoPlay
        playsInline
      >
        <source src={asset.url} type={`video/${asset.extension}`} />
      </video>
    </figure>
  )
}

export default MediaVideoGif
