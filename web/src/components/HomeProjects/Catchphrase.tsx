import type { FC } from "react"

import useRootData from "~/hooks/useRootData"

import TextBlock from "../TextBlock"

const Catchphrase: FC = () => {
  const { catchphrase } = useRootData()

  return (
    <div className="flex items-center justify-center py-28 text-left text-7xl">
      <TextBlock>{catchphrase.desktop}</TextBlock>
    </div>
  )
}

export default Catchphrase
