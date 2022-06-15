import type { FC } from "react"

import useRootData from "~/hooks/useRootData"
import LinkButton from "../LinkButton"
import AboutNavbarMailMeButton from "./AboutNavbarMailMeButton"
import AboutNavbarRerollButton from "./AboutNavbarRerollButton"

const AboutNavbar: FC = () => {
  const { literals } = useRootData()

  return (
    <nav className="flex items-start justify-between py-16 text-2xl">
      <ul className="-mb-2 flex flex-wrap items-center">
        <LinkButton className="mb-2 mr-2" href={literals.navLinkBehanceLink}>
          {literals.navLinkBehanceLabel}
        </LinkButton>
        <LinkButton className="mb-2 mr-2" href={literals.navLinkInstagramLink}>
          {literals.navLinkInstagramLabel}
        </LinkButton>
        <AboutNavbarMailMeButton className="mb-2 mr-2">
          {literals.navLinkMailMeLabel}
        </AboutNavbarMailMeButton>
      </ul>
      <div className="flex">
        <AboutNavbarRerollButton />
      </div>
    </nav>
  )
}

export default AboutNavbar
