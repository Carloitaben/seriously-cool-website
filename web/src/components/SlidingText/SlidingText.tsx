import type { FC, CSSProperties } from "react"
import { useEffect, useRef, useState } from "react"

import useRootData from "~/hooks/useRootData"

import useIsFontLoaded from "./useIsFontLoaded"
import { getDuration, getTextShadow } from "./utils"

type Props = {
  children: string[]
}

const SlidingText: FC<Props> = ({ children }) => {
  const { theme } = useRootData()

  const isFontLoaded = useIsFontLoaded(theme.fontFamily)
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
    <div className="h-slidingTextDesktop text-2xl uppercase whitespace-nowrap select-none items-center flex overflow-hidden border-t-2 border-current">
      <span
        ref={childWrapper}
        style={style}
        className="inline-block space-x-20 pr-20 -ml-10"
      >
        {children.map((text, index) => (
          <span key={index}>{text}</span>
        ))}
      </span>
    </div>
  )
}

export default SlidingText
