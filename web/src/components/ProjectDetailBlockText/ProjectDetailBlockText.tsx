import type { FC } from "react"

import type { ProjectBlockRichText } from "~/types"

import type { ProjectDetailBlockCommonProps } from "~/components/ProjectDetailBlocks"
import Appear from "~/components/Appear"
import TextBlock from "~/components/TextBlock"


type Props = ProjectDetailBlockCommonProps & ProjectBlockRichText

const ProjectDetailBlockText: FC<Props> = ({ animate, textRaw }) => {
  return (
    <div className="px-18 grid grid-cols-8 gap-x-8">
      <Appear animate={animate} className="col-span-4 col-end-9 py-20 text-2xl">
        <TextBlock>{textRaw}</TextBlock>
      </Appear>
    </div>
  )
}

export default ProjectDetailBlockText
