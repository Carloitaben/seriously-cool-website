import type { FC } from "react"
import { useRef, useCallback, useState, useEffect } from "react"

import useOnMatchMedia from "~/hooks/useOnMatchMedia"

import CursorComponent from "./CursorComponent"

const style = "* { cursor: none !important; }"

type Props = {
  cursor: string
}

const Cursor: FC<Props> = ({ cursor }) => {
  const [cursorElement, setCursorElement] = useState<JSX.Element>()
  const cssRuleIndexRef = useRef<number>()

  const handleCursor = useCallback(
    async (matches: boolean) => {
      if (!matches) return setCursorElement(undefined)

      try {
        let jsx
        switch (cursor) {
          case "arrow":
            jsx = await import("./sprites/arrow")
            break
          case "finger":
            jsx = await import("./sprites/finger")
            break
          case "sword":
            jsx = await import("./sprites/sword")
            break
          default:
            throw Error(`unhandled cursor ${cursor}`)
        }

        setCursorElement(jsx.default as unknown as JSX.Element)
      } catch (error) {
        console.warn("Error getting random cursor", error)
        setCursorElement(undefined)
      }
    },
    [cursor]
  )

  useOnMatchMedia("(pointer: fine)", handleCursor)

  useEffect(() => {
    const sheet = document.styleSheets[0]

    if (cursorElement) {
      cssRuleIndexRef.current = sheet.insertRule(style, sheet.cssRules.length)
    } else if (cssRuleIndexRef.current) {
      sheet.deleteRule(cssRuleIndexRef.current)
      cssRuleIndexRef.current = undefined
    }
  }, [cursorElement])

  if (!cursorElement) return null

  return <CursorComponent cursor={cursorElement} />
}

export default Cursor
