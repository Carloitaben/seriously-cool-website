import type { FC } from "react"
import { useEffect, useRef, useState, useCallback } from "react"

import store from "~/store"

type Props = {
  children: string
}

const TIMEOUT_DURATION_MS = 1250

const MailMeButton: FC<Props> = ({ children }) => {
  const [blockClicks, setBlockClicks] = useState(false)
  const timeout = useRef<NodeJS.Timeout>()

  const setSlidingText = store((state) => state.setSlidingText)
  const setSlidingTextMask = store((state) => state.setSlidingTextMask)

  const handleEmail = useCallback(async () => {
    try {
      if (!("clipboard" in navigator)) {
        throw Error("Clipboard API is not supported")
      }

      await navigator.clipboard.writeText("the@seriouslycool.website")
      setSlidingTextMask(["Copied!"])
    } catch (error) {
      // noop
      window.open("mailto:the@seriouslycool.website", "_blank")
      setSlidingTextMask(["Opened!"])
    } finally {
      timeout.current = setTimeout(() => {
        setSlidingTextMask(null)
        setBlockClicks(false)
      }, TIMEOUT_DURATION_MS)
    }
  }, [setSlidingTextMask])

  useEffect(() => {
    if (blockClicks) {
      handleEmail()

      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current)
          timeout.current = undefined
        }
      }
    }
  }, [blockClicks, handleEmail])

  function setText() {
    if ("clipboard" in navigator) {
      setSlidingText(["Click to copy", "the@seriouslycool.website"])
    } else {
      setSlidingText(["Click to open", "the@seriouslycool.website"])
    }
  }

  function unsetText() {
    setSlidingText(null)
  }

  function handleClick() {
    if (!blockClicks) setBlockClicks(true)
  }

  return (
    <button
      type="button"
      className="underline"
      onMouseEnter={setText}
      onMouseLeave={unsetText}
      onFocus={setText}
      onBlur={unsetText}
      onClick={handleClick}
      aria-disabled={blockClicks}
    >
      {children}
    </button>
  )
}

export default MailMeButton
