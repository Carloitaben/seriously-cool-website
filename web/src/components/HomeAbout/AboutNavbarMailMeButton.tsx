import type { FC } from "react"
import { useEffect, useRef, useState, useCallback } from "react"

import useOnTailwindBreakpoint from "~/hooks/useOnTailwindBreakpoint"
import useRootData from "~/hooks/useRootData"

import store from "~/store"

import { className } from "~/components/LinkButton"

type Props = {
  children: string
}

const TIMEOUT_DURATION_MS = 1250

const NavbarMailMeButton: FC<Props> = ({ children }) => {
  const { literals } = useRootData()

  const [menuContentVisible, setIsMenuContentVisible] = useState(false)
  const [blockClicks, setBlockClicks] = useState(false)
  const timeout = useRef<NodeJS.Timeout>()

  const setSlidingText = store((state) => state.setSlidingText)
  const setSlidingTextMask = store((state) => state.setSlidingTextMask)

  useOnTailwindBreakpoint("menuContentVisible", setIsMenuContentVisible)

  const handleEmail = useCallback(async () => {
    try {
      if (!("clipboard" in navigator)) {
        throw Error("Clipboard API is not supported")
      }

      await navigator.clipboard.writeText(literals.email)
      setSlidingTextMask([literals.clickToCopySuccess])
    } catch (error) {
      // noop
      window.open(`mailto:${literals.email}`, "_blank")
      setSlidingTextMask([literals.clickToOpenSuccess])
    } finally {
      timeout.current = setTimeout(() => {
        setSlidingTextMask(null)
        setBlockClicks(false)
      }, TIMEOUT_DURATION_MS)
    }
  }, [
    literals.clickToCopySuccess,
    literals.clickToOpenSuccess,
    literals.email,
    setSlidingTextMask,
  ])

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
      setSlidingText([literals.clickToCopy, literals.email])
    } else {
      setSlidingText([literals.clickToOpen, literals.email])
    }
  }

  function unsetText() {
    setSlidingText(null)
  }

  function handleClick() {
    if (!menuContentVisible) {
      return window.open(`mailto:${literals.email}`, "_blank")
    }

    if (!blockClicks) {
      setBlockClicks(true)
    }
  }

  return (
    <button
      type="button"
      className={className}
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

export default NavbarMailMeButton
