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
    <div className="tablet:px-18 tablet:gap-y-18 tablet:pb-18 tablet:grid-cols-8 tablet:pt-24 grid grid-cols-4 gap-y-3 gap-x-8 px-4 pb-5 pt-3">
      <AppendixRoles project={project} />
      <AppendixAwards project={project} />
      <AppendixSection title={literals.credit}>
        <h5 className="uppercase">{project.category}</h5>
        <div className="flex items-end justify-between space-x-8">
          <TextBlock className="tablet:max-w-2xl max-w-xl">
            {project.clientRaw}
          </TextBlock>
          <span>{project.year}</span>
        </div>
      </AppendixSection>
    </div>
  )
}

export default ProjectDetailAppendix
