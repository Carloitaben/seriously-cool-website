import create from "zustand"

export type Store = {
  slidingText: string[] | null
  setSlidingText: (slidingText: string[] | string | null) => void
  slidingTextMask: Store["slidingText"]
  setSlidingTextMask: Store["setSlidingText"]
  skipProjectsAppear: boolean
  setSkipProjectsAppear: (value: boolean) => void
}

function ensureArray(text: string[] | string | null) {
  if (typeof text === "string") return [text]
  return text
}

const useStore = create<Store>((set, get) => ({
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
  skipProjectsAppear: false,
  setSkipProjectsAppear: (value) =>
    set((state) => ({
      ...state,
      skipProjectsAppear: value,
    })),
}))

export default useStore
