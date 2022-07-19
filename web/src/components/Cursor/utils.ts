import type { RefObject } from "react"

export function lerp(from: number, to: number, percentage: number) {
  return from * (1 - percentage) + to * percentage
}

export function lerpDelta(
  from: number,
  to: number,
  percentage: number,
  frameDelta: number,
  targetFps = 60
) {
  const relativeDelta = frameDelta / (1 / targetFps)
  const smoothing = 1 - percentage
  return lerp(from, to, 1 - Math.pow(smoothing, relativeDelta))
}

export function move(
  ref: RefObject<HTMLElement>,
  { x, y }: { x: number; y: number }
) {
  if (!ref.current) return
  ref.current.style.transform = `translate(${x}%, ${y}%)`
}
