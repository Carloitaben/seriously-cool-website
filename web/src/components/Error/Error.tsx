import { useIsomorphicLayoutEffect } from "framer-motion"
import type { FC } from "react"

import useRootData from "~/hooks/useRootData"
import store from "~/store"

const Error: FC = () => {
  const { errorText, slidingTextsError } = useRootData()
  const setSlidingText = store((state) => state.setSlidingText)

  useIsomorphicLayoutEffect(() => {
    setSlidingText(slidingTextsError)
    return () => setSlidingText(null)
  })

  return (
    <div className="flex h-screen items-center justify-center text-8xl">
      {errorText}
    </div>
  )
}

export default Error
