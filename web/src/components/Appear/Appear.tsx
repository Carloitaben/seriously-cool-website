import type { FC, ReactElement } from "react"
import { useEffect, useRef, useState } from "react"

import type { IntersectionObserverHookConfig } from "~/hooks/useIntersectionObserver"
import useIntersectionObserver from "~/hooks/useIntersectionObserver"

type Props = {
  className?: string
  /**
   * Programatically control the animation
   */
  animate?: boolean
  /**
   * Skips animation
   */
  skip?: boolean
  children: ReactElement
  intersectionObserverConfig?: Partial<
    Omit<IntersectionObserverHookConfig, "disconnect">
  >
}

const Appear: FC<Props> = ({
  children,
  skip,
  animate,
  className = "",
  intersectionObserverConfig = {
    rootMargin: "0% 0% -50px",
  },
}) => {
  const [show, setShow] = useState(animate)
  const ref = useRef<HTMLDivElement>(null)

  const intersecting = useIntersectionObserver(ref, {
    disconnect: typeof animate !== "undefined",
    ...intersectionObserverConfig,
  })

  useEffect(() => {
    if (animate || intersecting) setShow(true)
  }, [animate, intersecting])

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          animation:
            !skip &&
            `appear-animation 1s cubic-bezier(1, 0, 0, 1) 0s both ${
              show ? "running" : "paused"
            }`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Appear
