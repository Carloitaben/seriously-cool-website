import type { FC } from "react"

import type { ProjectBlockMedia } from "~/types"
import type { ProjectDetailBlockCommonProps } from "~/components/ProjectDetailBlocks"

import Slider from "./Slider"
import Block from "./Block"

type Props = ProjectDetailBlockCommonProps & ProjectBlockMedia

const ProjectDetailBlockMedia: FC<Props> = ({ first, mediaBlockBlocks }) => {
  if (mediaBlockBlocks.length === 0) return null

  if (mediaBlockBlocks.length >= 3) {
    return <Slider blocks={mediaBlockBlocks} first={first} />
  }

  return (
    <div className="mb-2 grid grid-cols-2 gap-2 px-2">
      {mediaBlockBlocks.map((block) => (
        <Block
          className={mediaBlockBlocks.length === 1 ? "col-end-3" : ""}
          key={block._key}
          block={block}
          first={first}
        />
      ))}
    </div>
  )
}

export default ProjectDetailBlockMedia
