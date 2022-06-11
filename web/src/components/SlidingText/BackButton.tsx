import type { FC } from "react"
import { Link, useLocation } from "@remix-run/react"

import { close } from "~/components/Svg"

const BackButton: FC = () => {
  const location = useLocation()

  if (location.pathname === "/") return null

  return (
    <div className="flex-none">
      <Link
        to="/"
        className="bg-background ml-4 flex h-16 w-16 items-center justify-center rounded-full border-2"
      >
        {close}
      </Link>
    </div>
  )
}

export default BackButton
