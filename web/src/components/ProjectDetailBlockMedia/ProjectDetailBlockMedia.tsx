import type { FC } from "react"

import type { ProjectDetailBlockCommonProps, ProjectBlockMedia } from "~/types"

import Appear from "../Appear"

type Props = ProjectDetailBlockCommonProps & ProjectBlockMedia

const ProjectDetailBlockMedia: FC<Props> = ({ animate }) => {
  return (
    <Appear animate={animate}>
      <div>ProjectDetailBlockMedia</div>
    </Appear>
  )
}

export default ProjectDetailBlockMedia
