import type { FC, ReactNode } from "react"
import { NavLink } from "@remix-run/react"

import useRootData from "~/hooks/useRootData"

import NavbarMailMeButton from "./NavbarMailMeButton"
import NavbarMobileMenu from "./NavbarMobileMenu"

type Props = {
  children: ReactNode
}

const Navbar: FC<Props> = ({ children }) => {
  const { literals } = useRootData()

  return (
    <nav className="px-container menuContentVisible:space-x-4 h-navbar fixed inset-x-0 top-0 flex items-center justify-between text-2xl">
      {children}
      <NavbarMobileMenu>
        <ul
          className={`
            menuContentVisible:flex-row menuContentVisible:text-2xl menuContentVisible:normal-case menuContentVisible:leading-normal
            menuContentVisible:space-x-4 tablet:leading-loose mobileSub:text-[13vw] flex h-full flex-col
            items-center justify-center text-5xl uppercase leading-normal
          `}
        >
          <li className="tablet:hidden">
            <NavLink to="/about">{literals.navLinkAboutLabel}</NavLink>
          </li>
          <li className="tablet:hidden">
            <NavLink to="/projects">{literals.navLinkProjectsLabel}</NavLink>
          </li>
          <li>
            <a
              href={literals.navLinkBehanceLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {literals.navLinkBehanceLabel}
            </a>
          </li>
          <li>
            <a
              href={literals.navLinkInstagramLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {literals.navLinkInstagramLabel}
            </a>
          </li>
          <li>
            <NavbarMailMeButton>
              {literals.navLinkMailMeLabel}
            </NavbarMailMeButton>
          </li>
        </ul>
      </NavbarMobileMenu>
    </nav>
  )
}

export default Navbar
