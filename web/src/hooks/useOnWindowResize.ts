import { useEffect } from "react"

export default function useOnWindowResize(
  callback: () => void,
  enabled = true
) {
  useEffect(() => {
    if (enabled) {
      callback()
      window.addEventListener("resize", callback, true)
    }

    return () => window.removeEventListener("resize", callback, true)
  }, [callback, enabled])
}
