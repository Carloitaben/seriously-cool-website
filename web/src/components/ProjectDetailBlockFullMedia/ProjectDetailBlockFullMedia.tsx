import type { FC } from "react"
import { useCallback, useRef, useState } from "react"

import type { Media as MediaProps } from "~/types"

import useIntersectionObserver from "~/hooks/useIntersectionObserver"

import type { ProjectDetailBlockCommonProps } from "~/components/ProjectDetailBlocks"
import Appear from "~/components/Appear"
import Media from "~/components/Media"

type Props = ProjectDetailBlockCommonProps & MediaProps

const ProjectDetailBlockFullMedia: FC<Props> = ({ first, ...mediaProps }) => {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const load = useIntersectionObserver(ref, {
    rootMargin: "0% 0% 50%",
  })

  const intersecting = useIntersectionObserver(ref, {
    disconnect: first,
  })

  const onLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <div ref={ref} className="desktop:col-span-6 col-span-4">
      <Appear animate={(first || intersecting) && loaded}>
        <Media
          enableLightbox
          load={first || load}
          intersecting={first || intersecting}
          onLoad={onLoad}
          {...mediaProps}
        />
      </Appear>
    </div>
  )
}

export default ProjectDetailBlockFullMedia
