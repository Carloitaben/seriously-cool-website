import type { FC } from "react"

import LateralTitle from "~/components/LateralTitle"
import { emojiLogo } from "~/components/Svg"

const Home: FC = () => {
  return (
    <div className="bg-red-300 h-full pt-16 flex  pb-12">
      <LateralTitle href="/about">
        About myself
        <br />
        over here
      </LateralTitle>
      <div className="flex-1 flex items-center justify-center px-12">
        {emojiLogo}
      </div>
      <LateralTitle href="/projects" flip>
        Projects are
        <br />
        this way
      </LateralTitle>
    </div>
  )
}

export default Home
