import type { FC, ReactNode } from "react"
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"

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
  const childrenVariants = origin === "left" ? "right" : "left"

  return (
    <motion.div
      className="fixed inset-x-0 top-0 bottom-[3.125rem] overflow-hidden"
      initial={origin}
      animate="show"
      exit={origin}
      variants={variants}
    >
      <motion.div
        className="bg-red-500 h-full pt-16"
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
