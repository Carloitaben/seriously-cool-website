import type { FC } from "react"
import type { Transition, Variants } from "framer-motion"
import { motion, MotionConfig } from "framer-motion"

type Props = {
  close: boolean
}

const transition: Transition = {
  duration: 0.2,
}

const variants: Record<string, Variants> = {
  edges: {
    close: (position: "top" | "bottom") => {
      return {
        y: position === "top" ? 7 : -7,
        rotate: position === "top" ? 45 : -45,
      }
    },
    open: {
      y: 0,
      rotate: 0,
    },
  },
  center: {
    close: {
      scaleX: 0,
    },
    open: {
      scaleX: 1,
    },
  },
}

const NavbarMobileMenuIcon: FC<Props> = ({ close }) => {
  const animate: keyof typeof variants = close ? "close" : "open"

  return (
    <div className="tablet:mr-0 -mr-2 flex h-12 w-12 items-center justify-center">
      <MotionConfig transition={transition}>
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={false}
          animate={animate}
        >
          <motion.rect
            variants={variants.edges}
            width="16"
            height="2"
            fill="currentColor"
            custom="top"
          />
          <motion.rect
            variants={variants.center}
            y="7"
            width="16"
            height="2"
            fill="currentColor"
          />
          <motion.rect
            variants={variants.edges}
            y="14"
            width="16"
            height="2"
            fill="currentColor"
            custom="bottom"
          />
        </motion.svg>
      </MotionConfig>
    </div>
  )
}

export default NavbarMobileMenuIcon
