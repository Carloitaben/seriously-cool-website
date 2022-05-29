import type { Variants } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import type { FC, ReactNode } from "react"

import Portal from "~/components/Portal"

type Props = {
  renderLightbox: boolean
  onClose: () => void

  children: ReactNode
}

const variants = {
  hide: {
    "--tw-bg-opacity": 0,
  },
  show: {
    "--tw-bg-opacity": 0.75,
  },
}

const Lightbox: FC<Props> = ({ children, renderLightbox, onClose }) => {
  return (
    <AnimatePresence initial={false}>
      {renderLightbox && (
        <Portal>
          <motion.div
            className="fixed inset-0 bg-black p-4"
            initial="hide"
            animate="show"
            exit="hide"
            variants={variants as Variants}
            onClick={onClose}
          >
            <div className="flex h-full items-center justify-center">
              {children}
            </div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  )
}

export default Lightbox
