import type { Transition, Variants } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import type { Dispatch, FC, ReactNode, SetStateAction } from "react"

import Portal from "~/components/Portal"

type Props = {
  renderLightbox: boolean
  setLightbox: Dispatch<SetStateAction<boolean>>

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

const Lightbox: FC<Props> = ({ children, renderLightbox, setLightbox }) => {
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
            onClick={() => setLightbox(false)}
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
