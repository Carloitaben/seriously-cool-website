import type { FC, CSSProperties } from "react"
import { useMemo, useEffect, useRef, useState } from "react"
import { Link } from "@remix-run/react"

import useRootData from "~/hooks/useRootData"

import store from "~/store"
import { close } from "~/components/Svg"

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
    <div className="text-text border-text fixed inset-x-4 bottom-4 flex select-none">
      <div className="bg-background flex h-16 flex-1 items-center overflow-hidden whitespace-nowrap rounded-full border-2 border-current text-2xl uppercase">
        <span
          ref={childWrapper}
          style={style}
          className="-ml-10 inline-block space-x-20 pr-20"
        >
          {childrenOrMask.map((text, index) => (
            <span key={`${index}-${childrenOrMask.join("")}`}>{text}</span>
          ))}
        </span>
      </div>
      <div className="flex-0">
        <Link
          to="/"
          className="flex-0 bg-background ml-4 flex h-16 w-16 items-center justify-center rounded-full border-2"
        >
          {close}
        </Link>
      </div>
    </div>
  )
}

export default SlidingText
