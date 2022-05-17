import { Link } from "@remix-run/react"
import type { FC } from "react"

type Props = {
  children: string | string[]
  href: `/${string}`
  flip?: boolean
}

const LateralTitle: FC<Props> = ({ children, href, flip = false }) => {
  return (
    <div className="h-full text-5xl text-center uppercase whitespace-nowrap px-container">
      <div className="flex items-center justify-center w-24 underline h-full">
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
