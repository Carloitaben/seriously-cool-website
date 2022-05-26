import type { RefObject } from "react"
import { useEffect, useRef, useState } from "react"

export type IntersectionObserverHookConfig = IntersectionObserverInit & {
  callback?: (entry: IntersectionObserverEntry) => void
  disconnect?: boolean
}

/**
 * Creates an `IntersectionObserver` that will observe the provided reference.
 */
export default function useIntersectionObserver<T extends RefObject<any>>(
  reference: T,
  config: IntersectionObserverHookConfig = {}
) {
  const { disconnect = false, callback, ...intersectionObserverInit } = config

  const [intersecting, setIntersecting] = useState(false)
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    if (reference.current && !disconnect) {
      observer.current = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting)
        if (callback) callback(entry)
      }, intersectionObserverInit)

      observer.current.observe(reference.current)

      return () => {
        if (observer.current) observer.current.disconnect()
        observer.current = undefined
      }
    }
  }, [callback, disconnect, intersectionObserverInit, reference])

  return intersecting
}
