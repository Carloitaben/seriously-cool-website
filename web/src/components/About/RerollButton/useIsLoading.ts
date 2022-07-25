import { useTransition } from "@remix-run/react"
import { useCallback, useEffect, useState } from "react"

export default function useIsLoading() {
  const [loading, setLoading] = useState(false)
  const [transitionLoading, setTransitionLoading] = useState(false)

  const { state, location } = useTransition()

  useEffect(() => {
    const fetching = state === "loading" && location?.pathname === "/"

    if (loading && !transitionLoading && fetching) {
      setTransitionLoading(true)
    }

    if (loading && transitionLoading && !fetching) {
      setLoading(false)
      setTransitionLoading(false)
    }
  }, [loading, location?.pathname, state, transitionLoading])

  const onClick = useCallback(() => {
    setLoading(true)
  }, [])

  return { onClick, loading: loading && transitionLoading }
}
