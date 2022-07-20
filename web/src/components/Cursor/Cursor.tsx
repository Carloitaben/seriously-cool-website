import type { FC } from "react"
import { useRef, useCallback, useState, useEffect } from "react"

import useOnMatchMedia from "~/hooks/useOnMatchMedia"
import { getRandomArrayItem } from "~/utils"

import CursorComponent from "./CursorComponent"

const style = "* { cursor: none !important; }"

const cursors = ["arrow", "finger", "sword"]

const Cursor: FC = () => {
  const [cursor, setCursor] = useState<JSX.Element>()
  const cssRuleIndexRef = useRef<number>()

  const handleCursor = useCallback(async (matches: boolean) => {
    if (!matches) return setCursor(undefined)

    try {
      const randomCursor = getRandomArrayItem(cursors)
      let jsx

      switch (randomCursor) {
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
          throw Error(`unhandled cursor ${randomCursor}`)
      }

      setCursor(jsx.default as unknown as JSX.Element)
    } catch (error) {
      console.warn("Error getting random cursor", error)
      setCursor(undefined)
    }
  }, [])

  useOnMatchMedia("(pointer: fine)", handleCursor)

  useEffect(() => {
    const sheet = document.styleSheets[0]

    if (cursor) {
      cssRuleIndexRef.current = sheet.insertRule(style, sheet.cssRules.length)
    } else if (cssRuleIndexRef.current) {
      sheet.deleteRule(cssRuleIndexRef.current)
      cssRuleIndexRef.current = undefined
    }
  }, [cursor])

  if (!cursor) return null

  return <CursorComponent cursor={cursor} />
}

export default Cursor
