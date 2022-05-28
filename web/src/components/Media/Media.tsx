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
  onLoad,
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

  const props = {
    intersecting: intersectingProp || intersecting,
    load: intersectingProp || load,
    ref,
    className,
    onLoad,
  }

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
