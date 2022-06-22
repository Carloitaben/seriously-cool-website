import type { TailwindScreen } from "~/types"
import tailwindConfig from "tailwind.config"

import useOnMatchMedia from "./useOnMatchMedia"

/**
 * Executes a callback whenever the provided Tailwind screen
 * matches the current media query
 */
export default function useOnTailwindBreakpoint(
  screen: TailwindScreen,
  callback: (matches: boolean) => void
) {
  useOnMatchMedia(
    `(min-width: ${tailwindConfig.theme.screens[screen]})`,
    callback
  )
}
