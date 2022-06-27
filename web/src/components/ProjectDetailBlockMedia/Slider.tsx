import type { CSSProperties, FC } from "react"
import { useEffect, useState, useRef } from "react"
import type { DraggableProps } from "framer-motion"
import { motion } from "framer-motion"

import type { Media as MediaProps } from "~/types"
import useOnTailwindBreakpoint from "~/hooks/useOnTailwindBreakpoint"
import Block from "./Block"
import useOnWindowResize from "~/hooks/useOnWindowResize"

type Props = {
  first?: boolean
  blocks: MediaProps[]
}

const DESKTOP_GAP = 8
const MOBILE_GAP = 4

const Slider: FC<Props> = ({ first, blocks }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState<boolean>()
  const [leftConstraint, setLeftConstraint] = useState(0)

  useOnTailwindBreakpoint("desktop", setIsDesktop)

  useOnWindowResize(() => {
    const element = ref.current

    if (!element || typeof isDesktop === "undefined") return
    const gap = isDesktop ? DESKTOP_GAP : MOBILE_GAP
    setLeftConstraint((element.scrollWidth - element.offsetWidth + gap) * -1)
  })

  const dragConstraints: DraggableProps["dragConstraints"] = {
    right: 0,
    left: leftConstraint,
  }

  function getBlockStyle(block: MediaProps): CSSProperties {
    if (block.kind === "IMAGE") {
      const { width, height } = block.image.image.asset.metadata.dimensions
      return {
        aspectRatio: `${width / height}`,
      }
    }

    const { width, height } = block.video
    return {
      aspectRatio: `${width / height}`,
    }
  }

  return (
    <div className="project-detail-grid m-2">
      <div className="-mr-18 col-span-7 col-start-2">
        <motion.div
          className="flex h-[80vh] space-x-2"
          drag="x"
          dragConstraints={dragConstraints}
          ref={ref}
        >
          {blocks.map((block) => {
            const style = getBlockStyle(block)
            return (
              <div key={block._key} className="flex-none" style={style}>
                <Block block={block} first={first} />
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default Slider
