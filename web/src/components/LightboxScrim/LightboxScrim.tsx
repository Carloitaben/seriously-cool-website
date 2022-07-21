import type { FC } from "react"
import type { Variants } from "framer-motion"
import { motion, AnimatePresence } from "framer-motion"

import store from "~/store"
import { lightboxTransition } from "~/utils"

const variants: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 0.75,
  },
}

const LightboxScrim: FC = () => {
  const lightboxId = store((state) => state.lightboxId)
  const setLightboxId = store((state) => state.setLightboxId)

  function onTap() {
    setLightboxId(null)
  }

  return (
    <AnimatePresence initial={false}>
      {lightboxId && (
        <motion.div
          className="fixed inset-0 z-30 h-full bg-black"
          initial="hide"
          animate="show"
          exit="hide"
          variants={variants}
          transition={lightboxTransition}
          onTap={onTap}
        />
      )}
    </AnimatePresence>
  )
}

export default LightboxScrim
