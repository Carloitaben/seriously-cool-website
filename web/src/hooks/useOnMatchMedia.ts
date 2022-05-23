import { useEffect } from "react"

/**
 * Executes a callback whenever the provided `breakpoint` matches
 */
export default function useOnMatchMedia(
  breakpoint: string,
  callback: (matches: boolean) => void
) {
  useEffect(() => {
    const mediaQuery = window.matchMedia(breakpoint)

    function handleMediaQueryChange(event: MediaQueryListEvent) {
      callback(event.matches)
    }

    // Execute on mount
    callback(mediaQuery.matches)

    mediaQuery.addEventListener("change", handleMediaQueryChange)

    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
  }, [breakpoint, callback])
}
