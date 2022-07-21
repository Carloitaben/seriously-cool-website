import type { FC } from "react"
import { useState } from "react"

import type { ProjectDetailLoaderData } from "~/routes/projects/$slug"

import Appear from "~/components/Appear"
import AppearText from "~/components/AppearText"
import TextBlock from "~/components/TextBlock"
import ProjectDetailBlocks from "~/components/ProjectDetailBlocks"
import ProjectDetailAppendix from "~/components/ProjectDetailAppendix"
import LightboxScrim from "~/components/LightboxScrim"

type Props = {
  project: ProjectDetailLoaderData["project"]
}

const ProjectDetail: FC<Props> = ({ project }) => {
  const [finishedTitleAnimation, setFinishedTitleAnimation] = useState(false)

  return (
    <>
      <div className="tablet:pb-20 overflow-hidden pb-16">
        <div className="tablet:px-18 tablet:my-24 tablet:grid-cols-8 mt-10 mb-7 grid grid-cols-4 gap-x-8 px-4">
          <div className="tablet:col-span-3 tablet:text-5xl tablet:mb-0 tablet:max-w-xl col-span-4 mb-5 max-w-md text-2xl leading-tight">
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
            className="tablet:max-w-2xl tablet:col-end-9 col-span-4 max-w-xl"
          >
            <TextBlock>{project.descriptionRaw}</TextBlock>
          </Appear>
        </div>
        <ProjectDetailBlocks>{project.blocks}</ProjectDetailBlocks>
        <ProjectDetailAppendix project={project} />
      </div>
      <LightboxScrim />
    </>
  )
}

export default ProjectDetail
