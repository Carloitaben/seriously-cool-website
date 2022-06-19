import type { FC } from "react"
import { Link, useLocation } from "@remix-run/react"

import useRootData from "~/hooks/useRootData"
import { close } from "~/components/Svg"

const BackButton: FC = () => {
  const location = useLocation()

  const {
    theme: { colors },
  } = useRootData()

  if (location.pathname === "/") return null

  return (
    <div className="flex-none">
      <Link
        to="/"
        className="ml-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-current"
        style={{ background: colors.background }}
      >
        {close}
      </Link>
    </div>
  )
}

export default BackButton
