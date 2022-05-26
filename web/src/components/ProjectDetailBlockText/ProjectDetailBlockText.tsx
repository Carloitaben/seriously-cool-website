import type { FC } from "react"

import type { ProjectBlockRichText } from "~/types"

import TextBlock from "../TextBlock"

type Props = ProjectBlockRichText

const ProjectDetailBlockText: FC<Props> = ({ textRaw }) => {
  return (
    <div className="tablet:text-2xl desktop:py-20 desktop:text-2xl desktop:col-span-3 desktop:col-end-7 col-span-4 -my-2 py-12 text-lg">
      <TextBlock>{textRaw}</TextBlock>
    </div>
  )
}

export default ProjectDetailBlockText
