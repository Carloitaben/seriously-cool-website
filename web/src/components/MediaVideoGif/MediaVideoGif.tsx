import type { FC } from "react"
import { useRef, useEffect } from "react"

import useIntersectionObserver from "~/hooks/useIntersectionObserver"
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
  const video = useRef<HTMLVideoElement>(null)

  const intersecting = useIntersectionObserver(video)

  useEffect(() => {
    if (!video.current) return

    if (intersecting) {
      video.current.play()
    } else {
      video.current.pause()
    }
  }, [intersecting])

  return (
    <div
      data-intersecting={intersecting}
      className={`${className} w-full relative overflow-hidden`}
      style={{ paddingBottom: `${(height / width) * 100}%` }}
    >
      <video
        className="absolute inset-0 w-full h-full"
        ref={video}
        title={alt}
        loop
        muted
        autoPlay
        playsInline
      >
        <source src={asset.url} type={`video/${asset.extension}`} />
      </video>
    </div>
  )
}

export default MediaVideoGif
