import type { FC } from "react"
import { useState } from "react"

import type { ProjectDetailLoaderData } from "~/routes/projects/$slug"

import Appear from "~/components/Appear"
import AppearText from "~/components/AppearText"
import TextBlock from "~/components/TextBlock"
import ProjectDetailClientLocation from "~/components/ProjectDetailClientLocation"
import ProjectDetailBlocks from "~/components/ProjectDetailBlocks"

type Props = {
  project: ProjectDetailLoaderData["project"]
}

const ProjectDetail: FC<Props> = ({ project }) => {
  const [finishedTitleAnimation, setFinishedTitleAnimation] = useState(false)

  return (
    <div className="overflow-y-hidden pb-20">
      <div className="px-18 my-24 grid grid-cols-8 gap-x-8 text-2xl">
        <div className="col-span-3 max-w-xl text-5xl leading-tight">
          <h1>
            <AppearText
              onAnimationStart={() => setFinishedTitleAnimation(true)}
            >
              {project.title}
            </AppearText>
          </h1>
        </div>
        <Appear
          animate={finishedTitleAnimation}
          className="col-span-4 col-end-9 max-w-2xl"
        >
          <TextBlock>{project.descriptionRaw}</TextBlock>
        </Appear>
      </div>
      <ProjectDetailBlocks>{project.blocks}</ProjectDetailBlocks>
      <div className="text-2xl">
        <ProjectDetailClientLocation
          client={project.clientRaw}
          location={project.location}
          year={project.year}
        />
      </div>
    </div>
  )
}

export default ProjectDetail
