import { Link } from "@remix-run/react"
import type { FC } from "react"

import { dice } from "~/components/Svg"

const AboutNavbarRerollButton: FC = () => {
  return (
    <Link
      to="."
      className="flex h-16 w-16 flex-none items-center justify-center rounded-full border-2 border-current"
    >
      {dice}
    </Link>
  )
}

export default AboutNavbarRerollButton
