import type { FC } from "react"

import type { ProjectDetailBlockCommonProps, Media } from "~/types"

import Appear from "../Appear"

type Props = ProjectDetailBlockCommonProps & Media

const ProjectDetailBlockFullMedia: FC<Props> = ({ animate }) => {
  return (
    <Appear animate={animate}>
      <div className="desktop:col-span-6 col-span-4">
        ProjectDetailBlockFullMedia
      </div>
    </Appear>
  )
}

export default ProjectDetailBlockFullMedia
