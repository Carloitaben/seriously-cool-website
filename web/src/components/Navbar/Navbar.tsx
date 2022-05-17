import type { FC, ReactNode } from "react"
import { NavLink } from "@remix-run/react"
import MailMeButton from "./MailMeButton"

type Props = {
  children: ReactNode
}

const Navbar: FC<Props> = ({ children }) => {
  return (
    <nav className="text-2xl flex justify-between py-4 space-x-4 px-container fixed inset-x-0 top-0 h-16">
      <div className="flex-1">{children}</div>
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/projects">Projects</NavLink>
        </li>
        <a
          href="https://www.behance.net/unavirgulilla/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Behance
        </a>
        <a
          href="https://www.instagram.com/unavirgulilla/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <MailMeButton>Mail me</MailMeButton>
      </ul>
    </nav>
  )
}

export default Navbar
