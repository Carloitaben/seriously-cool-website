import type { FC } from "react"

import type { ProjectBlockRichText } from "~/types"

import type { ProjectDetailBlockCommonProps } from "~/components/ProjectDetailBlocks"
import Appear from "~/components/Appear"
import TextBlock from "~/components/TextBlock"


type Props = ProjectDetailBlockCommonProps & ProjectBlockRichText

const ProjectDetailBlockText: FC<Props> = ({ first, textRaw }) => {
  return (
    <div className="project-detail-grid">
      <Appear
        animate={first || undefined}
        className="tablet:col-end-9 tablet:py-20 col-span-4 max-w-xl py-4"
      >
        <TextBlock>{textRaw}</TextBlock>
      </Appear>
    </div>
  )
}

export default ProjectDetailBlockText
