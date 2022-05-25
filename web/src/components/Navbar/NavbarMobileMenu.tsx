import type { FC, ReactNode } from "react"
import { useEffect, useState, useCallback } from "react"
import type { Variants } from "framer-motion"
import { m, MotionConfig } from "framer-motion"

import { layoutTransitionProp } from "~/utils"
import useOnTailwindBreakpoint from "~/hooks/useOnTailwindBreakpoint"

import NavbarMobileMenuIcon from "./NavbarMobileMenuIcon"
import { Link, useLocation } from "@remix-run/react"

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

// TODO: get from CMS
const openMenuLiteral = "Open menu"
// TODO: get from CMS
const closeMenuLiteral = "Close menu"

/**
 * Renders children normally on desktop and wraps them
 * with an animated overlay in smaller screens
 */
const NavbarMobileMenu: FC<Props> = ({ children, goBackRoute }) => {
  const { pathname } = useLocation()
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    setOpened(false)
  }, [pathname])

  return (
    <MotionConfig transition={layoutTransitionProp}>
      <div className="menuContentVisible:[display:unset] hidden">
        {children}
      </div>
      <m.div
        className="bg-accent text-background selection:bg-background selection:text-accent menuContentVisible:hidden fixed inset-0 overflow-hidden"
        initial="hide"
        animate={opened ? "show" : "hide"}
        variants={variants}
        custom={{ invert: false }}
      >
        <m.div
          className="relative h-full w-full"
          initial="hide"
          animate={opened ? "show" : "hide"}
          variants={variants}
          custom={{ invert: true }}
        >
          {children}
          <div className="h-navbar px-container absolute top-0 right-0 flex items-center justify-center">
            <button
              className="menuContentVisible:hidden"
              aria-label={opened ? closeMenuLiteral : openMenuLiteral}
              onClick={() => setOpened((current) => !current)}
            >
              <NavbarMobileMenuIcon opened={opened} />
            </button>
          </div>
        </m.div>
      </m.div>
      {goBackRoute ? (
        <Link
          className="menuContentVisible:hidden"
          prefetch={goBackRoute === "/" ? "none" : "intent"}
          to={goBackRoute}
        >
          <NavbarMobileMenuIcon opened />
        </Link>
      ) : (
        <button
          className="menuContentVisible:hidden"
          aria-label={opened ? closeMenuLiteral : openMenuLiteral}
          onClick={() => setOpened((current) => !current)}
        >
          <NavbarMobileMenuIcon opened={opened} />
        </button>
      )}
    </MotionConfig>
  )
}

export default NavbarMobileMenu
