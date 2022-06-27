import create from "zustand"

import type { MediaSlice } from "./mediaSlice"
import { createMediaSlice } from "./mediaSlice"
import type { SlidingTextSlice } from "./slidingtextSlice"
import { createSlidingTextSlice } from "./slidingtextSlice"

export type Store = SlidingTextSlice & MediaSlice

const store = create<Store>()((...actions) => ({
  ...createSlidingTextSlice(...actions),
  ...createMediaSlice(...actions),
}))

export default store
