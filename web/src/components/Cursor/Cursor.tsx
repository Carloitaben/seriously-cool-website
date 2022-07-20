import type { FC } from "react"
import { useState } from "react"

import useOnMatchMedia from "~/hooks/useOnMatchMedia"

import CursorComponent from "./CursorComponent"

const Cursor: FC = () => {
  const [enableCursor, setEnableCursor] = useState(false)

  useOnMatchMedia("(pointer: fine)", setEnableCursor)

  if (!enableCursor) return null

  return <CursorComponent />
}

export default Cursor
