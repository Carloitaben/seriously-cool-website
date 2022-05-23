import type { FC, ReactNode } from "react"
import { NavLink } from "@remix-run/react"

import useRootData from "~/hooks/useRootData"

import MailMeButton from "./MailMeButton"

type Props = {
  children: ReactNode
}

const Navbar: FC<Props> = ({ children }) => {
  const { literals } = useRootData()

  return (
    <nav className="text-2xl flex justify-between py-4 space-x-4 px-container fixed inset-x-0 top-0 h-16">
      <div className="flex-1">{children}</div>
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/about">{literals.navLinkAboutLabel}</NavLink>
        </li>
        <li>
          <NavLink to="/projects">{literals.navLinkProjectsLabel}</NavLink>
        </li>
        <a
          href={literals.navLinkBehanceLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {literals.navLinkBehanceLabel}
        </a>
        <a
          href={literals.navLinkInstagramLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {literals.navLinkInstagramLabel}
        </a>
        <MailMeButton>{literals.navLinkMailMeLabel}</MailMeButton>
      </ul>
    </nav>
  )
}

export default Navbar
