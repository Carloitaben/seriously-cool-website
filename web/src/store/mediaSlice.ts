import type { StateCreator } from "zustand"

export type MediaSlice = {
  lightboxId: string | null
  setLightboxId: (id: MediaSlice["lightboxId"]) => void
}

export const createMediaSlice: StateCreator<MediaSlice, [], []> = (set) => ({
  lightboxId: null,
  setLightboxId: (id) =>
    set((state) => ({
      ...state,
      lightboxId: id,
    })),
})
