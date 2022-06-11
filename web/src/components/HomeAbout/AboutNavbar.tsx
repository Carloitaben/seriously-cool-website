import type { FC } from "react"

import Link from "~/components/Link"
import useRootData from "~/hooks/useRootData"
import AboutNavbarMailMeButton from "./AboutNavbarMailMeButton"
import AboutNavbarRerollButton from "./AboutNavbarRerollButton"

const AboutNavbar: FC = () => {
  const { literals } = useRootData()

  return (
    <nav className="flex items-center justify-between space-x-2 py-16 text-2xl">
      <ul className="flex items-center justify-center space-x-2">
        <li className="flex h-16 flex-none items-center justify-center rounded-full border-2 border-current px-8 text-center uppercase">
          <Link href={literals.navLinkBehanceLink}>
            {literals.navLinkBehanceLabel}
          </Link>
        </li>
        <li className="flex h-16 flex-none items-center justify-center rounded-full border-2 border-current px-8 text-center uppercase">
          <Link href={literals.navLinkInstagramLink}>
            {literals.navLinkInstagramLabel}
          </Link>
        </li>
        <li className="flex h-16 flex-none items-center justify-center rounded-full border-2 border-current px-8 text-center uppercase">
          <AboutNavbarMailMeButton>
            {literals.navLinkMailMeLabel}
          </AboutNavbarMailMeButton>
        </li>
      </ul>
      <AboutNavbarRerollButton />
    </nav>
  )
}

export default AboutNavbar
