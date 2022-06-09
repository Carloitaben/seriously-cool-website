import type { FC, ReactNode } from "react"
import { NavLink } from "@remix-run/react"

import useRootData from "~/hooks/useRootData"

import Link from "~/components/Link"

import NavbarMailMeButton from "./NavbarMailMeButton"
import NavbarMobileMenu from "./NavbarMobileMenu"

type Props = {
  children: ReactNode
  goBackRoute?: string
}

const Navbar: FC<Props> = ({ children, goBackRoute }) => {
  const { literals } = useRootData()

  return (
    <nav className="px-container menuContentVisible:space-x-4 h-navbar fixed inset-x-0 top-0 flex items-center justify-between text-2xl">
      {children}
      <NavbarMobileMenu goBackRoute={goBackRoute}>
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
            <Link href={literals.navLinkBehanceLink}>
              {literals.navLinkBehanceLabel}
            </Link>
          </li>
          <li>
            <Link href={literals.navLinkInstagramLink}>
              {literals.navLinkInstagramLabel}
            </Link>
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
