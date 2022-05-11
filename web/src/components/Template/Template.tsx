import type { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
}

const Template: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default Template
