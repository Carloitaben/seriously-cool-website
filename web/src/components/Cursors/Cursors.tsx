import type { FC } from "react"
import { useRef, useEffect } from "react"

import { throttle } from "~/utils"

import type { CursorProps } from "./Cursor"
import Cursor from "./Cursor"

const Cursors: FC = () => {
  const cursor = useRef<CursorProps>(null)

  useEffect(() => {
    const handleForceTouchUp = () => {
      cursor.current!.click(false, true)
    }
    const handleForceTouchDown = () => {
      cursor.current!.click(true, true)
    }

    const handleMouseUp = () => {
      cursor.current!.click(false, false)
    }

    const handleMouseDown = () => {
      cursor.current!.click(true, false)
    }

    const handleMouseMove = throttle((event: MouseEvent) => {
      const x = (event.clientX * 100) / window.innerWidth
      const y = (event.clientY * 100) / window.innerHeight
      cursor.current!.move(x, y)
    }, 50)

    window.addEventListener("webkitmouseforceup", handleForceTouchUp, true)
    window.addEventListener("webkitmouseforcedown", handleForceTouchDown, true)
    window.addEventListener("mouseup", handleMouseUp, true)
    window.addEventListener("mousedown", handleMouseDown, true)
    window.addEventListener("mousemove", handleMouseMove, true)
    return () => {
      window.removeEventListener("webkitmouseforceup", handleForceTouchUp, true) // prettier-ignore
      window.removeEventListener("webkitmouseforcedown", handleForceTouchDown, true) // prettier-ignore
      window.removeEventListener("mouseup", handleMouseUp, true)
      window.removeEventListener("mousedown", handleMouseDown, true)
      window.removeEventListener("mousemove", handleMouseMove, true)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
      <Cursor ref={cursor} type="finger" />
    </div>
  )
}

export default Cursors
