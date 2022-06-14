import type { RefObject } from "react"
import { useEffect } from "react"

import type { MediaComponentSharedProps } from "./Media"

export default function useAttatchVideoEvents(
  ref: RefObject<HTMLVideoElement>,
  {
    onLoad,
  }: {
    onLoad: MediaComponentSharedProps["onLoad"]
  }
) {
  useEffect(() => {
    const element = ref.current

    if (element && onLoad) {
      element.addEventListener("loadeddata", onLoad)
    }

    return () => {
      if (element && onLoad) {
        element.removeEventListener("loadeddata", onLoad)
      }
    }
  }, [onLoad, ref])
}
