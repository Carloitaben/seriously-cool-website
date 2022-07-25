import type { FC } from "react"

import useRootData from "~/hooks/useRootData"
import LinkButton from "~/components/LinkButton"

import AboutNavbarMailMeButton from "./AboutNavbarMailMeButton"
import RerollButton from "./RerollButton"

const AboutNavbar: FC = () => {
  const { literals } = useRootData()

  return (
    <nav className="desktop:py-16 flex items-start justify-between pt-10 pb-20 text-2xl">
      <ul className="desktop:-mb-2 -mb-3 flex flex-wrap items-center">
        <LinkButton
          className="desktop:mb-2 desktop:mr-2 mb-3 mr-3"
          href={literals.navLinkBehanceLink}
        >
          {literals.navLinkBehanceLabel}
        </LinkButton>
        <LinkButton
          className="desktop:mb-2 desktop:mr-2 mb-3 mr-3"
          href={literals.navLinkInstagramLink}
        >
          {literals.navLinkInstagramLabel}
        </LinkButton>
        <AboutNavbarMailMeButton className="desktop:mb-2 desktop:mr-2 mb-3 mr-3">
          {literals.navLinkMailMeLabel}
        </AboutNavbarMailMeButton>
      </ul>
      <div className="flex">
        <RerollButton />
      </div>
    </nav>
  )
}

export default AboutNavbar
