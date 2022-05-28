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

const ProjectDetailBlocks: FC<Props> = ({ children }) => {
  return (
    <div className="desktop:grid-cols-6 tablet:gap-x-4 desktop:gap-x-2 px-container grid grid-cols-4 gap-x-2 gap-y-2">
      {children.map(({ __typename, _key, ...props }, index) => {
        switch (__typename) {
          case "ProjectBlockRichText":
            return (
              <ProjectDetailBlockText
                key={_key}
                animate={index === 0 || undefined}
                {...(props as ProjectBlockRichText)}
              />
            )
          case "ProjectBlockMedia":
            return (
              <ProjectDetailBlockMedia
                key={_key}
                animate={index === 0 || undefined}
                {...(props as ProjectBlockMedia)}
              />
            )
          case "Media":
            return (
              <ProjectDetailBlockFullMedia
                key={_key}
                animate={index === 0 || undefined}
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
