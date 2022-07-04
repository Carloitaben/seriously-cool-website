import { Link } from "@remix-run/react"
import type { FC } from "react"

import { dice } from "~/components/Svg"

const AboutNavbarRerollButton: FC = () => {
  return (
    <Link
      to="."
      draggable="false"
      className="desktop:h-16 desktop:w-16 flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-current"
    >
      <span className="desktop:max-w-[1.875rem] max-w-[1.5rem]">{dice}</span>
    </Link>
  )
}

export default AboutNavbarRerollButton
