import type { FC } from "react"
import { useCallback, useRef, useState } from "react"

import type { Media as MediaProps } from "~/types"

import useIntersectionObserver from "~/hooks/useIntersectionObserver"

import type { ProjectDetailBlockCommonProps } from "~/components/ProjectDetailBlocks"
import Appear from "~/components/Appear"
import Media from "~/components/Media"

type Props = ProjectDetailBlockCommonProps & MediaProps

const ProjectDetailBlockFullMedia: FC<Props> = ({ first, ...mediaProps }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  const load = useIntersectionObserver(ref, {
    disconnect: first,
    rootMargin: "0% 0% 50%",
  })

  const intersecting = useIntersectionObserver(ref, {
    disconnect: first,
  })

  const onLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  const animate = (first || intersecting) && loaded

  return (
    <div ref={ref} className="desktop:col-span-6 col-span-4 mb-2 px-2">
      <Appear animate={animate}>
        <Media
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
