import type { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
}

const ProjectDetailRoles: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default ProjectDetailRoles
