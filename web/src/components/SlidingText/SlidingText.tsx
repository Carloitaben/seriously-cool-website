import type { FC, CSSProperties } from "react"
import { useMemo } from "react"
import { useEffect, useRef, useState } from "react"

import useRootData from "~/hooks/useRootData"

import store from "~/store"

import useIsFontLoaded from "./useIsFontLoaded"
import { getDuration, getTextShadow } from "./utils"

type Props = {
  children: string[]
}

const SlidingText: FC<Props> = ({ children }) => {
  const { theme } = useRootData()

  const slidingText = store((state) => state.slidingText)
  const slidingTextMask = store((state) => state.slidingTextMask)

  const childrenOrMask = useMemo(() => {
    if (slidingTextMask) return slidingTextMask
    if (slidingText) return slidingText
    return children
  }, [children, slidingText, slidingTextMask])

  const isFontLoaded = useIsFontLoaded(theme.fontFamily)
  const childWrapper = useRef<HTMLSpanElement>(null)
  const [style, setStyle] = useState<CSSProperties>()

  useEffect(() => {
    if (!isFontLoaded || !childWrapper.current) return

    const duration = getDuration(childrenOrMask)
    const textShadow = getTextShadow(childWrapper.current.offsetWidth)

    setStyle({
      animationName: "sliding-text-animation",
      animationDuration: `${duration}s`,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      textShadow,
    })
  }, [childrenOrMask, isFontLoaded])

  return (
    <div className="h-slidingTextDesktop text-2xl uppercase whitespace-nowrap select-none items-center flex overflow-hidden border-t-2 border-current">
      <span
        ref={childWrapper}
        style={style}
        className="inline-block space-x-20 pr-20 -ml-10"
      >
        {childrenOrMask.map((text, index) => (
          <span key={index}>{text}</span>
        ))}
      </span>
    </div>
  )
}

export default SlidingText
