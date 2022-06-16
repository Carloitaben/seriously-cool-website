import type { FC } from "react"

import { emojiLogo } from "~/components/Svg"

const Logo: FC = () => {
  return (
    <div className="flex items-center justify-center p-28">{emojiLogo}</div>
  )
}

export default Logo
