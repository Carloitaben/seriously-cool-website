import type { FC } from "react"
import { useMemo } from "react"
import { Link as RemixLink } from "@remix-run/react"

import store from "~/store"

type Props = {
  alt?: string
  href: string
  children: string
  className?: string
}

export const defaultStyles =
  "flex h-12 desktop:h-16 flex-none items-center justify-center rounded-full border-2 border-current px-5 desktop:px-8 text-center uppercase no-underline"

const Link: FC<Props> = ({
  alt,
  href,
  children,
  className: classNameProp = "",
}) => {
  const events = useMemo(() => {
    const setSlidingText = store.getState().setSlidingText

    return {
      onMouseEnter: () => setSlidingText(alt || children),
      onMouseLeave: () => setSlidingText(null),
      onFocus: () => setSlidingText(alt || children),
      onBlur: () => setSlidingText(null),
    }
  }, [alt, children])

  const className = `${classNameProp} ${defaultStyles}`

  if (href?.charAt(0) === "/") {
    return (
      <RemixLink to={href} {...events} className={className}>
        {children}
      </RemixLink>
    )
  }

  if (href?.includes("http")) {
    return (
      <a
        className={className}
        href={href}
        target="blank"
        rel="noopener noreferrer"
        {...events}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={className} {...events}>
      {children}
    </button>
  )
}

export default Link
