import type { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
}

const Overlay: FC<Props> = ({ children }) => {
  return <div className="bg-red-500">{children}</div>
}

export default Overlay
