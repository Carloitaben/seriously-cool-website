import { useState } from "react"

import useOnMatchMedia from "~/hooks/useOnMatchMedia"

export default function useCanHover() {
  const [canHover, setCanHover] = useState(false)
  useOnMatchMedia("(pointer: fine)", setCanHover)
  return canHover
}
