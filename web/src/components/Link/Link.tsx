import type { FC } from "react"
import { useMemo } from "react"
import { Link as RemixLink } from "@remix-run/react"

import store from "~/store"

type Props = {
  alt?: string
  href: string
  children: string
}

const Link: FC<Props> = ({ alt, href, children }) => {
  const events = useMemo(() => {
    const setSlidingText = store.getState().setSlidingText

    return {
      onMouseEnter: () => setSlidingText(alt || children),
      onMouseLeave: () => setSlidingText(null),
      onFocus: () => setSlidingText(alt || children),
      onBlur: () => setSlidingText(null),
    }
  }, [alt, children])

  if (href?.charAt(0) === "/") {
    return (
      <RemixLink draggable="false" to={href} {...events}>
        {children}
      </RemixLink>
    )
  }

  if (href?.includes("http")) {
    return (
      <a
        href={href}
        target="blank"
        rel="noopener noreferrer"
        draggable="false"
        {...events}
      >
        {children}
      </a>
    )
  }

  return (
    <button className="underline" {...events}>
      {children}
    </button>
  )
}

export default Link
