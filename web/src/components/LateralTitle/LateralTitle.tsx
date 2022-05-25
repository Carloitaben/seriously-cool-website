import { Link } from "@remix-run/react"
import type { FC } from "react"

export type Props = {
  labels: {
    desktop: string | string[]
    tablet: string | string[]
  }
  href: `/${string}`
  flip?: boolean
}

const LateralTitle: FC<Props> = ({ labels, href, flip = false }) => {
  return (
    <div className="px-container tablet:block hidden h-full whitespace-nowrap text-center text-5xl uppercase">
      <div className="desktop:w-24 flex h-full w-12 items-center justify-center underline">
        <Link
          prefetch="intent"
          to={href}
          className={flip ? "rotate-90" : "-rotate-90"}
        >
          <span className="desktop:hidden">{labels.tablet}</span>
          <span className="desktop:[display:unset] hidden">
            {labels.desktop[0]}
            <br />
            {labels.desktop[1]}
          </span>
        </Link>
      </div>
    </div>
  )
}

export default LateralTitle
