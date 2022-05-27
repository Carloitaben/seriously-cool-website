import type { FC } from "react"

import type {
  ProjectDetailBlockCommonProps,
  ProjectBlockRichText,
} from "~/types"

import Appear from "../Appear"
import TextBlock from "../TextBlock"

type Props = ProjectDetailBlockCommonProps & ProjectBlockRichText

const ProjectDetailBlockText: FC<Props> = ({ animate, textRaw }) => {
  return (
    <Appear animate={animate}>
      <div className="tablet:text-2xl desktop:py-20 desktop:text-2xl desktop:col-span-3 desktop:col-end-7 col-span-4 -my-2 py-12 text-lg">
        <TextBlock>{textRaw}</TextBlock>
      </div>
    </Appear>
  )
}

export default ProjectDetailBlockText
