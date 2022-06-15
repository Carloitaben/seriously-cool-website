import type { FC } from "react"
import { motion } from "framer-motion"

import type { ProjectDetailLoaderData } from "~/routes/projects/$slug"
import Media from "~/components/Media"

type Props = {
  project: ProjectDetailLoaderData["project"]
}

const ProjectDetailThumbnail: FC<Props> = ({ project }) => {
  return (
    <div className="px-2">
      <motion.div
        layoutId={project.title}
        className="w-full overflow-hidden"
        style={{ borderRadius: "32px" }}
      >
        <Media
          {...project.thumbnail}
          intersecting
          load
          // alt={project.thumbnail.video.alt || project.title}
        />
      </motion.div>
    </div>
  )
}

export default ProjectDetailThumbnail
