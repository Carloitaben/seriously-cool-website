import { useMatches } from "@remix-run/react"

export default function useSettings() {
  const [{ data }] = useMatches()

  return data.settings
}
