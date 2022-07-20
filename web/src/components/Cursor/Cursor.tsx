import type { FC } from "react"
import { useRef, useState, useEffect } from "react"

import useOnMatchMedia from "~/hooks/useOnMatchMedia"

import CursorComponent from "./CursorComponent"

const style = "* { cursor: none !important; }"

const Cursor: FC = () => {
  const [enableCursor, setEnableCursor] = useState(false)
  const sheetRuleRef = useRef<number>()

  useOnMatchMedia("(pointer: fine)", setEnableCursor)

  useEffect(() => {
    const sheet = document.styleSheets[0]

    if (enableCursor) {
      sheetRuleRef.current = sheet.insertRule(style, sheet.cssRules.length)
    } else if (sheetRuleRef.current) {
      sheet.deleteRule(sheetRuleRef.current)
      sheetRuleRef.current = undefined
    }
  }, [enableCursor])

  if (!enableCursor) return null

  return <CursorComponent />
}

export default Cursor
