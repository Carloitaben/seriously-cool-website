import type { FC, JSXElementConstructor, ReactElement } from "react"
import { useRef } from "react"
import { createPortal } from "react-dom"

type Props = {
  children: ReactElement<any, string | JSXElementConstructor<any>>
}

const Portal: FC<Props> = ({ children }) => {
  const body = useRef(
    typeof document !== "undefined" && document.querySelector("body")
  )

  if (!body.current) return null

  return createPortal(children, body.current)
}

export default Portal
