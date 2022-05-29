import type { FC } from "react"
import { useRef } from "react"

import type { Media as MediaProps } from "~/types"
import useIntersectionObserver from "~/hooks/useIntersectionObserver"
import { useLayoutScrollableSectionContext } from "~/components/LayoutScrollableSection"

import MediaImage from "./MediaImage"
import MediaVideoGif from "./MediaVideoGif"
import MediaVideoPlayer from "./MediaVideoPlayer"

// Exposed props
type Props = {
  /**
   * Used to programatically control the intersection state
   */
  intersecting?: boolean
  onLoad?: () => void
  className?: string
  enableLightbox?: boolean
}

// Internal media component shared props
export type MediaComponentSharedProps = Props & {
  /**
   * Used to start loading the source
   */
  load: boolean
}

const Media: FC<Pick<MediaProps, "kind" | "image" | "video"> & Props> = ({
  kind,
  image,
  video,
  intersecting: intersectingProp,
  className = "",
  ...props
}) => {
  const { scrollableRef } = useLayoutScrollableSectionContext()
  const ref = useRef(null)

  const intersecting = useIntersectionObserver(ref, {
    disconnect: typeof intersectingProp !== "undefined",
    root: scrollableRef.current,
  })

  const load = useIntersectionObserver(ref, {
    disconnect: typeof intersectingProp !== "undefined",
    rootMargin: "0% 0% 50%",
    root: scrollableRef.current,
  })

  const mediaProps = {
    intersecting: intersectingProp || intersecting,
    load: intersectingProp || load,
    ref,
    className,
    ...props,
  }

  switch (kind) {
    case "IMAGE":
      return <MediaImage {...mediaProps} {...image} />
    case "VIDEO_GIF":
      return <MediaVideoGif {...mediaProps} {...video} />
    case "VIDEO_PLAYER":
      return <MediaVideoPlayer {...mediaProps} {...video} />
    default:
      throw Error(`Unsupported media kind: ${kind}`)
  }
}

export default Media
