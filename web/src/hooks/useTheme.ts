import { useMatches } from "@remix-run/react"

export default function useTheme() {
  const [{ data }] = useMatches()

  return data.theme
}
