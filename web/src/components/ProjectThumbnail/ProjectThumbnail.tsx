import { Link } from "@remix-run/react"
import { useEffect, useMemo, useState } from "react"
import type { FC } from "react"

import type { ProjectsLoaderData } from "~/routes/projects"

import store from "~/store"
import Appear from "../Appear"
import MediaVideoGif from "../MediaVideoGif"

type Props = {
  project: ProjectsLoaderData["projects"][number]
}

const ProjectThumbnail: FC<Props> = ({ project }) => {
  const setSlidingText = store((state) => state.setSlidingText)

  const [animate, setAnimate] = useState(true)

  const awardsToShow = useMemo(
    () => project.awards?.filter((award) => award.showBadge) || [],
    [project.awards]
  )

  return (
    <Appear animate={animate}>
      <li className="col-span-3">
        <Link
          className="mx-1 mb-2 block focus:outline-none relative"
          to={project.slug.current}
          onMouseEnter={() => setSlidingText(project.title)}
          onMouseLeave={() => setSlidingText(null)}
          onFocus={() => setSlidingText(project.title)}
          onBlur={() => setSlidingText(null)}
          onClick={() => setSlidingText(null)}
        >
          {project?.thumbnail?.kind === "VIDEO_GIF" && (
            <MediaVideoGif
              {...project.thumbnail.video}
              alt={project.thumbnail.video.alt || project.title}
            />
          )}
          {/* TODO: awards with `toy` integration */}
          {/* {awardsToShow.length > 0 && (
            <div className="absolute inset-0">
              {awardsToShow.map((award, index) => (
                <span key={index}>award</span>
              ))}
            </div>
          )} */}
        </Link>
      </li>
    </Appear>
  )
}

export default ProjectThumbnail
