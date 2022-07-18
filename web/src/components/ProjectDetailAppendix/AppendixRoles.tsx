import type { FC } from "react"

import type { ProjectDetailLoaderData } from "~/routes/projects/$slug"
import useRootData from "~/hooks/useRootData"

import AppendixSection from "./AppendixSection"

type Props = {
  project: ProjectDetailLoaderData["project"]
}

const AppendixRoles: FC<Props> = ({ project }) => {
  const { literals } = useRootData()

  if (!project.roles.length) return null

  return (
    <AppendixSection title={literals.contribution}>
      {project.roles.map((role, index) => (
        <div key={role._key}>
          <h5 className="uppercase">{role.pretitle}</h5>
          <p className="max-w-2xl">{role.title}</p>
          {index + 1 !== project.roles.length && <br />}
        </div>
      ))}
    </AppendixSection>
  )
}

export default AppendixRoles
