import type { tailwindScreen } from "~/types"
import tailwindConfig from "tailwind.config"

import useOnBreakpoint from "./useOnBreakpoint"

/**
 * Executes a callback whenever the provided Tailwind screen
 * matches the current media query
 */
export default function useOnTailwindBreakpoint(
  screen: tailwindScreen,
  callback: (matches: boolean) => void
) {
  useOnBreakpoint(
    `(min-width: ${tailwindConfig.theme.screens[screen]})`,
    callback
  )
}
