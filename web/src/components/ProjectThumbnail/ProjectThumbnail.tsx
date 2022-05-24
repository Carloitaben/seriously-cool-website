import { Link } from "@remix-run/react"
import type { FC } from "react"
import { useEffect, useMemo, useRef, useState } from "react"

import type { ProjectsLoaderData } from "~/routes/projects"
import store from "~/store"
import useIntersectionObserver from "~/hooks/useIntersectionObserver"

import Appear from "../Appear"
import MediaVideoGif from "../MediaVideoGif"

type Props = {
  animate: boolean
  project: ProjectsLoaderData["projects"][number]
  onLoad: () => void
}

const ProjectThumbnail: FC<Props> = ({
  animate: animateProp,
  project,
  onLoad,
}) => {
  const setSlidingText = store((state) => state.setSlidingText)

  const awardsToShow = useMemo(
    () => project.awards?.filter((award) => award.showBadge) || [],
    [project.awards]
  )

  const ref = useRef<HTMLLIElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [animate, setAnimate] = useState(false)

  const intersecting = useIntersectionObserver(ref)

  useEffect(() => {
    if (intersecting && loaded && animateProp) setAnimate(true)
  }, [animateProp, intersecting, loaded])

  function onProjectLoad() {
    onLoad()
    setLoaded(true)
  }

  return (
    <li ref={ref} className="col-span-3">
      <Appear animate={animate}>
        <Link
          className="relative mx-1 mb-2 block ring-0 ring-current transition-shadow duration-75 hover:ring-2 focus:outline-none focus:ring-2"
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
              onLoad={onProjectLoad}
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
