import type { FC, ReactNode } from "react"
import { useEffect, useState } from "react"
import type { Variants } from "framer-motion"
import { m, MotionConfig } from "framer-motion"
import { useLocation, useNavigate, useTransition } from "@remix-run/react"

import { layoutTransitionProp } from "~/utils"

import useRootData from "~/hooks/useRootData"

import NavbarMobileMenuIcon from "./NavbarMobileMenuIcon"

type Props = {
  children: ReactNode
  goBackRoute?: string
}

const variants: Variants = {
  hide: ({ invert }: { invert: boolean }) => ({
    y: invert ? "100%" : "-100%",
  }),
  show: {
    y: "0%",
  },
}

/**
 * Renders children normally on desktop and wraps them
 * with an animated overlay in smaller screens
 */
const NavbarMobileMenu: FC<Props> = ({ children, goBackRoute }) => {
  const { literals } = useRootData()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [menuOpened, setMenuOpened] = useState(false)
  const [showCloseIcon, setShowCloseIcon] = useState(pathname !== "/")

  useEffect(() => {
    setMenuOpened(false)
    setShowCloseIcon(pathname !== "/")
  }, [pathname])

  function handleOpenMenuOrGoBack() {
    if (goBackRoute) {
      navigate(goBackRoute)
    } else {
      setMenuOpened((current) => !current)
    }
  }

  return (
    <MotionConfig transition={layoutTransitionProp}>
      <div className="menuContentVisible:[display:unset] hidden">
        {children}
      </div>
      <m.div
        className="bg-accent text-background selection:bg-background selection:text-accent menuContentVisible:hidden fixed inset-0 overflow-hidden"
        initial="hide"
        animate={menuOpened ? "show" : "hide"}
        variants={variants}
        custom={{ invert: false }}
      >
        <m.div
          className="relative h-full w-full"
          initial="hide"
          animate={menuOpened ? "show" : "hide"}
          variants={variants}
          custom={{ invert: true }}
        >
          {children}
          <div className="h-navbar px-container absolute top-0 right-0 flex items-center justify-center">
            <button
              className="menuContentVisible:hidden"
              aria-label={menuOpened ? literals.menuClose : literals.menuOpen}
              onClick={() => setMenuOpened((current) => !current)}
            >
              <NavbarMobileMenuIcon close={menuOpened || showCloseIcon} />
            </button>
          </div>
        </m.div>
      </m.div>
      <button
        className="menuContentVisible:hidden"
        aria-label={menuOpened ? literals.menuClose : literals.menuOpen}
        onClick={handleOpenMenuOrGoBack}
      >
        {/* <NavbarMobileMenuIcon close={menuOpened || !!goBackRoute} /> */}
        <NavbarMobileMenuIcon close={showCloseIcon || menuOpened} />
      </button>
    </MotionConfig>
  )
}

export default NavbarMobileMenu
