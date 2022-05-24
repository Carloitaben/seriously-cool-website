import { Link } from "@remix-run/react"
import type { FC } from "react"

type Props = {
  children: string | string[]
  href: `/${string}`
  flip?: boolean
}

const LateralTitle: FC<Props> = ({ children, href, flip = false }) => {
  return (
    <div className="px-container h-full whitespace-nowrap text-center text-5xl uppercase">
      <div className="flex h-full w-24 items-center justify-center underline">
        <Link
          prefetch="intent"
          to={href}
          className={flip ? "rotate-90" : "-rotate-90"}
        >
          {children}
        </Link>
      </div>
    </div>
  )
}

export default LateralTitle
