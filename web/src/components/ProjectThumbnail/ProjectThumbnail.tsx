import { Link } from "@remix-run/react"
import { useEffect, useMemo, useRef, useState } from "react"
import type { FC } from "react"

import type { ProjectsLoaderData } from "~/routes/projects"

import store from "~/store"
import Appear from "../Appear"
import MediaVideoGif from "../MediaVideoGif"
import useIntersectionObserver from "~/hooks/useIntersectionObserver"

type Props = {
  project: ProjectsLoaderData["projects"][number]
}

const ProjectThumbnail: FC<Props> = ({ project }) => {
  const setSlidingText = store((state) => state.setSlidingText)

  const ref = useRef<HTMLLIElement>(null)
  const [animate, setAnimate] = useState(false)

  const awardsToShow = useMemo(
    () => project.awards?.filter((award) => award.showBadge) || [],
    [project.awards]
  )

  const intersecting = useIntersectionObserver(ref)

  useEffect(() => {
    if (intersecting) setAnimate(true)
  }, [intersecting])

  return (
    <li ref={ref} className="col-span-3">
      <Appear animate={animate}>
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
              intersecting={intersecting}
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
      </Appear>
    </li>
  )
}

export default ProjectThumbnail
