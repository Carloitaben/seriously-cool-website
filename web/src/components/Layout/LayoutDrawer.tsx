import type { CSSProperties, FC, ReactNode } from "react"
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import useRootData from "~/hooks/useRootData"

type Props = {
  children: ReactNode
  origin: "left" | "right"
}

const variants: Variants = {
  left: {
    x: "-100%",
  },
  right: {
    x: "100%",
  },
  show: {
    x: "0%",
  },
}

const LayoutDrawer: FC<Props> = ({ children, origin }) => {
  const { theme } = useRootData()

  const style: CSSProperties = {
    background: theme.accent,
    color: theme.background,
  }

  const childrenVariants = origin === "left" ? "right" : "left"

  return (
    <motion.div
      className="bottom-slidingTextDesktop selection:bg-background selection:text-accent fixed inset-x-0 top-0 overflow-hidden"
      initial={origin}
      animate="show"
      exit={origin}
      variants={variants}
      style={style}
    >
      <motion.div
        className="pt-navbar h-full"
        initial={childrenVariants}
        animate="show"
        exit={childrenVariants}
        variants={variants}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default LayoutDrawer
