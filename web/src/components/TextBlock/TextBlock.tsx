import type { FC } from "react"
import { useMemo } from "react"
import type { PortableTextReactComponents } from "@portabletext/react"
import { PortableText } from "@portabletext/react"

import type { Scalars } from "~/types"

import Link from "~/components/Link"

type Props = {
  children: Scalars["JSON"]
}

const TextBlock: FC<Props> = ({ children }) => {
  const components = useMemo((): Partial<PortableTextReactComponents> => {
    return {
      marks: {
        link: ({ children, value }: any) => <Link {...value}>{children}</Link>,
      },
    }
  }, [])

  return (
    <span className="space-y-4">
      <PortableText value={children} components={components} />
    </span>
  )
}

export default TextBlock
