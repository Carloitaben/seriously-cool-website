import type { FC, JSXElementConstructor, ReactElement } from "react"
import { useEffect } from "react"
import { cloneElement, useRef, useState } from "react"

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
}

const Appear: FC<Props> = ({ children, skip, animate }) => {
  const [show, setShow] = useState(animate)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (animate) setShow(true)
  }, [animate])

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
