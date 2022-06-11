import type { FC } from "react"

import useRootData from "~/hooks/useRootData"
import LinkButton from "../LinkButton"
import AboutNavbarMailMeButton from "./AboutNavbarMailMeButton"
import AboutNavbarRerollButton from "./AboutNavbarRerollButton"

const AboutNavbar: FC = () => {
  const { literals } = useRootData()

  return (
    <nav className="flex items-center justify-between space-x-2 py-16 text-2xl">
      <ul className="flex items-center justify-center space-x-2">
        <LinkButton href={literals.navLinkBehanceLink}>
          {literals.navLinkBehanceLabel}
        </LinkButton>
        <LinkButton href={literals.navLinkInstagramLink}>
          {literals.navLinkInstagramLabel}
        </LinkButton>
        <AboutNavbarMailMeButton>
          {literals.navLinkMailMeLabel}
        </AboutNavbarMailMeButton>
      </ul>
      <AboutNavbarRerollButton />
    </nav>
  )
}

export default AboutNavbar
