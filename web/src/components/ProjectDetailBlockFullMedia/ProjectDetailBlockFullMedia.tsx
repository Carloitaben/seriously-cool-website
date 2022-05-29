import type { FC } from "react"

import type { Media as MediaProps } from "~/types"

import type { ProjectDetailBlockCommonProps } from "~/components/ProjectDetailBlocks"
import Appear from "~/components/Appear"
import Media from "~/components/Media"

type Props = ProjectDetailBlockCommonProps & MediaProps

const ProjectDetailBlockFullMedia: FC<Props> = ({ animate, ...mediaProps }) => {
  return (
    <Appear animate={animate}>
      <div className="desktop:col-span-6 col-span-4">
        <Media {...mediaProps} />
      </div>
    </Appear>
  )
}

export default ProjectDetailBlockFullMedia