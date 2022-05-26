import type { FC, JSXElementConstructor, ReactElement } from "react"
import { cloneElement, useEffect, useRef, useState } from "react"

import type { IntersectionObserverHookConfig } from "~/hooks/useIntersectionObserver"
import useIntersectionObserver from "~/hooks/useIntersectionObserver"

type Props = {
  /**
   * Programatically control the animation
   */
  animate?: boolean
  /**
   * Skips animation
   */
  skip?: boolean
  children: ReactElement<any, string | JSXElementConstructor<any>>
  intersectionObserverConfig?: Partial<
    Omit<IntersectionObserverHookConfig, "disconnect">
  >
}

const Appear: FC<Props> = ({
  children,
  skip,
  animate,
  intersectionObserverConfig = {
    rootMargin: "0% 0% -30%",
  },
}) => {
  const [show, setShow] = useState(animate)
  const ref = useRef<HTMLElement>(null)

  const intersecting = useIntersectionObserver(ref, {
    disconnect: typeof animate !== "undefined",
    ...intersectionObserverConfig,
  })

  useEffect(() => {
    if (animate || intersecting) setShow(true)
  }, [animate, intersecting])

  return cloneElement(children, {
    ref,
    style: {
      ...children.props.style,
      animation:
        !skip &&
        `appear-animation 1s cubic-bezier(1, 0, 0, 1) 0s both ${
          show ? "running" : "paused"
        }`,
    },
  })
}

export default Appear
