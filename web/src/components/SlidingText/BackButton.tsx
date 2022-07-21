import type { FC } from "react"
import { Link, useLocation } from "@remix-run/react"
import type { Variants } from "framer-motion"
import { motion, AnimatePresence } from "framer-motion"

import useRootData from "~/hooks/useRootData"
import { close } from "~/components/Svg"
import { lightboxTransition } from "~/utils"

const variants: Variants = {
  hide: {
    width: "0%",
    height: "0%",
  },
  show: {
    width: "auto",
    height: "auto",
  },
}

const BackButton: FC = () => {
  const location = useLocation()

  const {
    theme: { colors },
  } = useRootData()

  return (
    <AnimatePresence initial={false}>
      {location.pathname === "/" ? null : (
        <motion.div
          className="flex-none"
          initial="hide"
          animate="show"
          exit="hide"
          variants={variants}
          transition={lightboxTransition}
        >
          <Link
            to="/"
            className="tablet:h-16 tablet:w-16 ml-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-current"
            style={{ background: colors.background }}
          >
            {close}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BackButton
