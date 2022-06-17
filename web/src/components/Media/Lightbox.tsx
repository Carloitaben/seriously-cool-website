import { useFocusTrap } from "@mantine/hooks"
import type { Variants } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import type { FC, ReactNode } from "react"

import Portal from "~/components/Portal"
import useOnKey from "~/hooks/useOnKey"

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
} as Variants

const Lightbox: FC<Props> = ({ children, renderLightbox, onClose }) => {
  const ref = useFocusTrap()

  useOnKey((key) => {
    switch (key) {
      case "Escape":
      case "Enter":
      case " ":
        return onClose()
    }
  }, renderLightbox)

  return (
    <AnimatePresence initial={false}>
      {renderLightbox && (
        <Portal>
          <motion.div
            className="fixed inset-0 bg-black p-4 focus:outline-none"
            initial="hide"
            animate="show"
            exit="hide"
            variants={variants}
            onClick={onClose}
            ref={ref}
            tabIndex={0}
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
