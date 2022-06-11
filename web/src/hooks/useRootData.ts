import { useMatches } from "@remix-run/react"

import type { RootLoaderData } from "~/root"

/**
 * Returns `loader` data from the root route
 */
export default function useRootData() {
  const [{ data }] = useMatches()
  return data as RootLoaderData
}
