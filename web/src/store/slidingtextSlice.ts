import type { StateCreator } from "zustand"

type SlidingText = string[] | null

export type SlidingTextSlice = {
  slidingText: SlidingText
  setSlidingText: (slidingText: string | SlidingText) => void
  slidingTextMask: SlidingText
  setSlidingTextMask: (slidingText: string | SlidingText) => void
}

function ensureArray(text: string[] | string | null) {
  if (typeof text === "string") return [text]
  return text
}

export const createSlidingTextSlice: StateCreator<SlidingTextSlice, [], []> = (
  set
) => ({
  slidingText: null,
  setSlidingText: (text) =>
    set((state) => ({
      ...state,
      slidingText: ensureArray(text),
    })),
  slidingTextMask: null,
  setSlidingTextMask: (text) =>
    set((state) => ({
      ...state,
      slidingTextMask: ensureArray(text),
    })),
})
