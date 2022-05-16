import create from "zustand"

export type Store = {
  slidingTextMask: string | null
  setSlidingTextMask: (slidingText: Store["slidingTextMask"]) => void
}

const useStore = create<Store>((set, get) => ({
  slidingTextMask: null,
  setSlidingTextMask: (slidingTextMask) =>
    set((state) => ({
      ...state,
      slidingTextMask,
    })),
}))

export default useStore
