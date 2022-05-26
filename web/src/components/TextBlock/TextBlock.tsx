import type { FC } from "react"
import { useMemo } from "react"
import { PortableText } from "@portabletext/react"
import { Link } from "@remix-run/react"

import type { Scalars } from "~/types"

import store from "~/store"

type Props = {
  children: Scalars["JSON"]
}

const TextBlock: FC<Props> = ({ children }) => {
  const setSlidingText = store((state) => state.setSlidingText)

  const components = useMemo(() => {
    function getEvents(text: string) {
      return {
        onMouseEnter: () => setSlidingText(text),
        onMouseLeave: () => setSlidingText(null),
        onFocus: () => setSlidingText(text),
        onBlur: () => setSlidingText(null),
      }
    }

    return {
      marks: {
        link: ({ children, value }: any) => {
          const events = getEvents(value?.alt || children)

          if (value?.href?.charAt(0) === "/") {
            return (
              <Link to={value.href} {...events}>
                {children}
              </Link>
            )
          }

          if (value?.href?.includes("http")) {
            return (
              <a
                href={value.href}
                target="blank"
                rel="noopener noreferrer"
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
        },
      },
    }
  }, [setSlidingText])

  return <PortableText value={children} components={components} />
}

export default TextBlock
