import type { FC } from "react"

import type { ProjectDetailLoaderData } from "~/routes/projects/$slug"
import useRootData from "~/hooks/useRootData"
import TextBlock from "~/components/TextBlock"

import AppendixSection from "./AppendixSection"
import AppendixAwards from "./AppendixAwards"
import AppendixRoles from "./AppendixRoles"

type Props = {
  project: ProjectDetailLoaderData["project"]
}

const ProjectDetailAppendix: FC<Props> = ({ project }) => {
  const { literals } = useRootData()

  return (
    <div className="px-18 gap-y-18 pb-18 grid grid-cols-8 gap-x-8 pt-24">
      <AppendixRoles project={project} />
      <AppendixAwards project={project} />
      <AppendixSection title={literals.credit}>
        <h5 className="uppercase">{project.category}</h5>
        <div className="flex justify-between space-x-8">
          <TextBlock className="max-w-2xl">{project.clientRaw}</TextBlock>
          <span>{project.year}</span>
        </div>
      </AppendixSection>
    </div>
  )
}

export default ProjectDetailAppendix
