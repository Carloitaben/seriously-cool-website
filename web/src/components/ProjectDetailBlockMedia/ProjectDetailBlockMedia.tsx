import type { FC } from "react"

import type { ProjectBlockMedia } from "~/types"

import type { ProjectDetailBlockCommonProps } from "~/components/ProjectDetailBlocks"
import Appear from "~/components/Appear"

type Props = ProjectDetailBlockCommonProps & ProjectBlockMedia

const ProjectDetailBlockMedia: FC<Props> = ({ animate }) => {
  return (
    <Appear animate={animate}>
      <div>ProjectDetailBlockMedia</div>
    </Appear>
  )
}

export default ProjectDetailBlockMedia
