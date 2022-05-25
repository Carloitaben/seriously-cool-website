import type { FC } from "react"
import { useLocation, useOutlet } from "@remix-run/react"
import { MotionConfig, AnimatePresence } from "framer-motion"

import useRootData from "~/hooks/useRootData"
import { layoutTransitionProp } from "~/utils"

import Navbar from "~/components/Navbar"
import Home from "~/components/Home"
import SlidingText from "~/components/SlidingText"
import TextBlock from "~/components/TextBlock"

import LayoutDrawer from "./LayoutDrawer"
import useSkipProjectsAppear from "./useSkipProjectsAppear"

const Layout: FC = () => {
  const outlet = useOutlet()
  const location = useLocation()
  const { slidingTexts, catchphrase } = useRootData()

  useSkipProjectsAppear()

  return (
    <>
      <Navbar>
        <span className="tablet:hidden">
          <TextBlock>{catchphrase.mobile.textRaw}</TextBlock>
        </span>
        <span className="tablet:[display:unset] hidden">
          <TextBlock>{catchphrase.desktop.textRaw}</TextBlock>
        </span>
      </Navbar>
      <main className="flex-1">
        <Home />
        <MotionConfig transition={layoutTransitionProp}>
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
