import type { FC } from "react"
import { useMemo } from "react"
import { PortableText } from "@portabletext/react"
import { Link } from "@remix-run/react"

import type { Scalars } from "~/types/sanity"

import store from "~/store"

type Props = {
  children: Scalars["JSON"]
}

const TextBlock: FC<Props> = ({ children }) => {
  const setSlidingTextMask = store((state) => state.setSlidingTextMask)

  const components = useMemo(() => {
    function getEvents(text: string) {
      return {
        onMouseEnter: () => setSlidingTextMask(text),
        onMouseLeave: () => setSlidingTextMask(null),
        onFocus: () => setSlidingTextMask(text),
        onBlur: () => setSlidingTextMask(null),
      }
    }

    return {
      marks: {
        link: ({ children, value }: any) => {
          const events = getEvents(children)

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
  }, [setSlidingTextMask])

  return (
    <div>
      <PortableText value={children} components={components} />
    </div>
  )
}

export default TextBlock
