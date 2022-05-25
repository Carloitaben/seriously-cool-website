import { useLocation, useTransition } from "@remix-run/react"
import { useEffect } from "react"

import store from "~/store"

export default function useSkipProjectsAppear() {
  const location = useLocation()
  const routeTransition = useTransition()

  const setSkipProjectsAppear = store((state) => state.setSkipProjectsAppear)

  useEffect(() => {
    if (
      location.pathname === "/" &&
      routeTransition.location?.pathname === "/projects"
    ) {
      setSkipProjectsAppear(true)
    } else if (location.pathname !== "/projects") {
      setSkipProjectsAppear(false)
    }

    console.log(routeTransition)
  }, [location.pathname, routeTransition, setSkipProjectsAppear])
}
