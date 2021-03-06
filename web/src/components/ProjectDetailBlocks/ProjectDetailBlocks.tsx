import type { FC } from "react"

import type {
  GetProjectQuery,
  ProjectBlockMedia,
  ProjectBlockRichText,
  Media,
} from "~/types"

import ProjectDetailBlockText from "~/components/ProjectDetailBlockText"
import ProjectDetailBlockMedia from "~/components/ProjectDetailBlockMedia"
import ProjectDetailBlockFullMedia from "~/components/ProjectDetailBlockFullMedia"

type Props = {
  children: GetProjectQuery["allProject"][number]["blocks"]
}

export type ProjectDetailBlockCommonProps = {
  first?: boolean
}

const ProjectDetailBlocks: FC<Props> = ({ children }) => {
  return (
    <div>
      {children.map(({ __typename, _key, ...props }, index) => {
        switch (__typename) {
          case "ProjectBlockRichText":
            return (
              <ProjectDetailBlockText
                key={_key}
                first={index === 0}
                {...(props as ProjectBlockRichText)}
              />
            )
          case "ProjectBlockMedia":
            return (
              <ProjectDetailBlockMedia
                key={_key}
                first={index === 0}
                {...(props as ProjectBlockMedia)}
              />
            )
          case "Media":
            return (
              <ProjectDetailBlockFullMedia
                key={_key}
                first={index === 0}
                {...(props as Media)}
              />
            )
          default:
            throw Error(`Unsupported block type: ${__typename}`)
        }
      })}
    </div>
  )
}

export default ProjectDetailBlocks
