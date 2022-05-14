import type { FC, CSSProperties } from "react"
import { useEffect, useRef, useState } from "react"

import useSettings from "~/hooks/useSettings"
import useTheme from "~/hooks/useTheme"

import useIsFontLoaded from "./useIsFontLoaded"
import { getDuration, getTextShadow } from "./utils"

const SlidingText: FC = () => {
  const { slidingTexts } = useSettings()
  const { fontFamily } = useTheme()

  const isFontLoaded = useIsFontLoaded(fontFamily)
  const childWrapper = useRef<HTMLSpanElement>(null)
  const [style, setStyle] = useState<CSSProperties>()

  useEffect(() => {
    if (!isFontLoaded || !childWrapper.current) return

    const duration = getDuration(slidingTexts)
    const textShadow = getTextShadow(childWrapper.current.offsetWidth)

    setStyle({
      animationName: "sliding-text-animation",
      animationDuration: `${duration}s`,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      textShadow,
    })
  }, [slidingTexts, isFontLoaded])

  return (
    <div className="h-slidingTextDesktop text-2xl uppercase whitespace-nowrap select-none items-center flex overflow-hidden border-t-2">
      <span
        ref={childWrapper}
        style={style}
        className="inline-block space-x-20 pr-20 -ml-10"
      >
        {slidingTexts.map((text, index) => (
          <span key={index}>{text}</span>
        ))}
      </span>
    </div>
  )
}

export default SlidingText
