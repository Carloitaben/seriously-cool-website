import { Link } from "@remix-run/react"
import type { FC } from "react"
import { useEffect, useMemo, useRef, useState } from "react"

import type { ProjectsLoaderData } from "~/routes/projects"
import store from "~/store"
import useIntersectionObserver from "~/hooks/useIntersectionObserver"

import { useLayoutScrollableSectionContext } from "~/components/LayoutScrollableSection"
import Appear from "~/components/Appear"
import Media from "~/components/Media"

type Props = {
  animate: boolean
  project: ProjectsLoaderData["projects"][number]
  onLoad: () => void
  skipAppear: boolean
}

const ProjectThumbnail: FC<Props> = ({
  animate: animateProp,
  project,
  onLoad,
  skipAppear,
}) => {
  const setSlidingText = store((state) => state.setSlidingText)

  const awardsToShow = useMemo(
    () => project.awards?.filter((award) => award.showBadge) || [],
    [project.awards]
  )

  const ref = useRef<HTMLLIElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [animate, setAnimate] = useState(false)

  const { scrollableRef } = useLayoutScrollableSectionContext()

  const intersecting = useIntersectionObserver(ref, {
    root: scrollableRef.current,
  })

  useEffect(() => {
    if (intersecting && loaded && animateProp) setAnimate(true)
  }, [animateProp, intersecting, loaded])

  function onProjectLoad() {
    onLoad()
    setLoaded(true)
  }

  return (
    <li
      ref={ref}
      className="desktopMax:col-span-2 desktop:col-span-3 col-span-6"
    >
      <Appear animate={animate} skip={skipAppear}>
        <div className="flex flex-col">
          <Link
            className="desktop:mb-2 desktop:mx-1 relative ring-0 ring-current transition-shadow duration-75 hover:ring-2 focus:outline-none focus:ring-2"
            to={project.slug.current}
            onMouseEnter={() => setSlidingText(project.title)}
            onMouseLeave={() => setSlidingText(null)}
            onFocus={() => setSlidingText(project.title)}
            onBlur={() => setSlidingText(null)}
            onClick={() => setSlidingText(null)}
          >
            <Media
              {...project.thumbnail}
              intersecting={intersecting}
              onLoad={onProjectLoad}
              // alt={project.thumbnail.video.alt || project.title}
            />
            {/* TODO: awards with `toy` integration */}
            {/* {awardsToShow.length > 0 && (
                <div className="absolute inset-0">
                  {awardsToShow.map((award, index) => (
                    <span key={index}>award</span>
                  ))}
                </div>
              )} */}
          </Link>
          <h6 className="desktop:hidden tablet:mt-6 mt-2 mb-10 text-2xl">
            {project.title}
          </h6>
        </div>
      </Appear>
    </li>
  )
}

export default ProjectThumbnail
