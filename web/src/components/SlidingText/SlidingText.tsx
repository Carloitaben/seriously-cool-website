import type { FC, CSSProperties } from "react"
import { useEffect, useRef, useState } from "react"

import useIsFontLoaded from "./useIsFontLoaded"
import { getDuration, getTextShadow } from "./utils"

type Props = {
  children: string[]
}

const SlidingText: FC<Props> = ({ children }) => {
  const isFontLoaded = useIsFontLoaded("arial") // TODO: get this from loaderData
  const childWrapper = useRef<HTMLSpanElement>(null)
  const [style, setStyle] = useState<CSSProperties>()

  useEffect(() => {
    if (!isFontLoaded || !childWrapper.current) return

    const duration = getDuration(children)
    const textShadow = getTextShadow(childWrapper.current.offsetWidth)

    setStyle({
      animationName: "sliding-text-animation",
      animationDuration: `${duration}s`,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      textShadow,
    })
  }, [children, isFontLoaded])

  return (
    <div className="h-12 text-2xl uppercase whitespace-nowrap select-none items-center flex overflow-hidden">
      <span
        ref={childWrapper}
        style={style}
        className="inline-block space-x-20 pr-20"
      >
        {children.map((child, index) => (
          <span key={index}>{child}</span>
        ))}
      </span>
    </div>
  )
}

export default SlidingText
