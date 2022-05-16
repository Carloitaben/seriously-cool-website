import type { FC } from "react"
import { useLocation, useOutlet } from "@remix-run/react"
import type { Transition } from "framer-motion"
import { MotionConfig, AnimatePresence } from "framer-motion"

import Navbar from "~/components/Navbar"
import Home from "~/components/Home"
import SlidingText from "~/components/SlidingText"
import LayoutDrawer from "./LayoutDrawer"
import useRootData from "~/hooks/useRootData"
import TextBlock from "../TextBlock"

const transition: Transition = {
  type: "tween",
  ease: [0.76, 0, 0.24, 1],
  duration: 1,
}

const Layout: FC = () => {
  const location = useLocation()
  const outlet = useOutlet()

  const { slidingTexts, catchPhrase } = useRootData()

  return (
    <>
      <Navbar>
        <TextBlock>{catchPhrase.desktop.textRaw}</TextBlock>
      </Navbar>
      <main className="flex-1">
        <Home />
        <MotionConfig transition={transition}>
          <AnimatePresence exitBeforeEnter initial={false}>
            {location.pathname === "/about" && (
              <LayoutDrawer key="left" origin="left">
                {outlet}
              </LayoutDrawer>
            )}
            {location.pathname.includes("/project") && (
              <LayoutDrawer key="right" origin="right">
                {outlet}
              </LayoutDrawer>
            )}
          </AnimatePresence>
        </MotionConfig>
      </main>
      <SlidingText>{slidingTexts}</SlidingText>
    </>
  )
}

export default Layout
