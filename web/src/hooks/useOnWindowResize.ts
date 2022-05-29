import { useEffect } from "react"
import throttle from "lodash.throttle"

type Config = {
  delay?: number
  disable?: boolean
}

export default function useOnWindowResize(
  callback: () => any,
  config?: Config
): void {
  const { delay = 100, disable = false } = config || {}

  const throttleResize = throttle(callback, delay)

  useEffect(() => {
    if (typeof document !== "undefined" && !disable) {
      callback()

      window.addEventListener("resize", throttleResize, true)
      return window.removeEventListener("resize", throttleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, throttleResize])
}
