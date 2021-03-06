import type { FC, ReactElement } from "react"
import { useEffect, useRef, useState } from "react"

import type { IntersectionObserverHookConfig } from "~/hooks/useIntersectionObserver"
import useIntersectionObserver from "~/hooks/useIntersectionObserver"

type Props = {
  className?: string
  innerClassName?: string
  /**
   * Programatically control the animation
   */
  animate?: boolean
  /**
   * Skips animation
   */
  skip?: boolean
  children: ReactElement
  onIntersection?: (intersecting: boolean) => void
  intersectionObserverConfig?: Partial<
    Omit<IntersectionObserverHookConfig, "disconnect">
  >
}

const Appear: FC<Props> = ({
  children,
  skip,
  animate,
  onIntersection,
  className = "",
  innerClassName = "",
  intersectionObserverConfig,
}) => {
  const [show, setShow] = useState(animate)
  const [finished, setFinished] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const defaultConfig = {
    rootMargin: "0% 0% -50px",
  }

  const intersecting = useIntersectionObserver(ref, {
    ...defaultConfig,
    ...intersectionObserverConfig,
  })

  useEffect(() => {
    if (typeof animate === "boolean") {
      if (animate) setShow(true)
    } else if (intersecting) {
      setShow(true)
    }

    if (onIntersection) onIntersection(intersecting)
  }, [animate, intersecting, onIntersection])

  const style =
    skip || finished
      ? undefined
      : {
          animation: `appear-animation 1s cubic-bezier(1, 0, 0, 1) 0s both ${
            show ? "running" : "paused"
          }`,
        }

  return (
    <div ref={ref} className={className}>
      <div
        className={innerClassName}
        style={style}
        onAnimationEnd={() => setFinished(true)}
      >
        {children}
      </div>
    </div>
  )
}

export default Appear
