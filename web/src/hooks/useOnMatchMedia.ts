import { useEffect } from "react"

/**
 * Executes a callback whenever the provided `query` matches
 */
export default function useOnMatchMedia(
  query: string,
  callback: (matches: boolean) => void
) {
  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    function onChange(event: MediaQueryListEvent) {
      callback(event.matches)
    }

    // Execute on mount
    callback(mediaQuery.matches)

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", onChange)
      return () => mediaQuery.removeEventListener("change", onChange)
    } else {
      mediaQuery.addListener(onChange)
      return () => mediaQuery.removeListener(onChange)
    }
  }, [query, callback])
}
