import type { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
}

const ProjectDetailAwards: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default ProjectDetailAwards
