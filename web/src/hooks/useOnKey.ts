import { useEffect } from "react"

export default function useOnKey(
  callback: (key: string) => Promise<void> | void,
  listen: boolean = true
) {
  useEffect(() => {
    function handler(event: KeyboardEvent) {
      callback(event.key)
    }

    if (listen) window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [callback, listen])
}
