import { useCallback, useEffect, useState } from "react"
import FontFaceObserver from "fontfaceobserver"

/**
 * Exports a boolean indicating wether the provided `font`
 * has successfully loaded.
 */
export default function useIsFontLoaded(font: string) {
  const [loaded, setLoaded] = useState(false)

  const mountLoader = useCallback(async () => {
    const observer = new FontFaceObserver(font)

    try {
      await observer.load()
    } catch (error) {
      // Noop as we want to animate things even if this function fails
      console.warn(`Error loading font ${font}:`, error)
    } finally {
      setLoaded(true)
    }
  }, [font])

  useEffect(() => {
    mountLoader()
  }, [mountLoader])

  return loaded
}
