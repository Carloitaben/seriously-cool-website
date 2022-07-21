import type { FC, CSSProperties } from "react"
import { useMemo, useEffect, useRef, useState } from "react"
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"

import useRootData from "~/hooks/useRootData"
import store from "~/store"
import { lightboxTransition } from "~/utils"

import BackButton from "./BackButton"
import useIsFontLoaded from "./useIsFontLoaded"
import { getDuration, getTextShadow } from "./utils"

type Props = {
  children: string[]
}

const variants: Variants = {
  show: {
    y: "0rem",
    transition: {
      ...lightboxTransition,
      delay: lightboxTransition.duration,
    },
  },
  hide: {
    y: "5rem",
    transition: lightboxTransition,
  },
}

const SlidingText: FC<Props> = ({ children }) => {
  const {
    theme: { fontFamily, colors },
  } = useRootData()

  const slidingText = store((state) => state.slidingText)
  const slidingTextMask = store((state) => state.slidingTextMask)
  const lightboxId = store((state) => state.lightboxId)

  const childrenOrMask = useMemo(() => {
    if (slidingTextMask) return slidingTextMask
    if (slidingText) return slidingText
    return children
  }, [children, slidingText, slidingTextMask])

  const isFontLoaded = useIsFontLoaded(fontFamily)
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
    <motion.footer
      className="fixed inset-x-4 bottom-4 flex select-none items-center text-2xl"
      initial="show"
      animate={lightboxId ? "hide" : "show"}
      variants={variants}
      style={{ color: colors.text }}
    >
      <div
        className="tablet:h-16 flex h-12 flex-1 items-center overflow-hidden whitespace-nowrap rounded-full border-2 border-current uppercase"
        style={{ background: colors.background }}
      >
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
      <BackButton />
    </motion.footer>
  )
}

export default SlidingText
