import type { FC } from "react"

import useRootData from "~/hooks/useRootData"

const Error: FC = () => {
  const { errorText } = useRootData()

  return (
    <div className="flex h-screen items-center justify-center text-8xl">
      {errorText}
    </div>
  )
}

export default Error
