import type { FC } from "react"
import { useRef, useState, useCallback } from "react"

import type { Media as MediaProps } from "~/types"
import useIntersectionObserver from "~/hooks/useIntersectionObserver"
import Media from "../Media"
import Appear from "../Appear"

type Props = {
  className?: string
  block: MediaProps
  first?: boolean
}

const Block: FC<Props> = ({ className = "", first, block }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  const load = useIntersectionObserver(ref, {
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
    <div ref={ref} className={className}>
      <Appear animate={animate}>
        <Media
          load={load}
          intersecting={intersecting}
          onLoad={onLoad}
          {...block}
        />
      </Appear>
    </div>
  )
}

export default Block
