import { Link } from "@remix-run/react"
import type { FC, RefObject } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"

import type { RootLoaderData } from "~/root"
import store from "~/store"
import useIntersectionObserver from "~/hooks/useIntersectionObserver"

import Appear from "~/components/Appear"
import Media from "~/components/Media"

type Props = {
  animate: boolean
  project: RootLoaderData["projects"][number]
  onLoad: () => void
  rootRef: RefObject<HTMLElement>
}

const ProjectThumbnail: FC<Props> = ({ project, rootRef }) => {
  const awardsToShow = useMemo(
    () => project.awards?.filter((award) => award.showBadge) || [],
    [project.awards]
  )

  const events = useMemo(() => {
    const setSlidingText = store.getState().setSlidingText

    return {
      onMouseEnter: () => setSlidingText(project.title),
      onMouseLeave: () => setSlidingText(null),
      onFocus: () => setSlidingText(project.title),
      onBlur: () => setSlidingText(null),
      onClick: () => setSlidingText(null),
    }
  }, [project.title])

  const ref = useRef<HTMLLIElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [animate, setAnimate] = useState(false)

  const load = useIntersectionObserver(ref, {
    rootMargin: "0% 0% 50%",
    root: rootRef.current,
  })

  const intersecting = useIntersectionObserver(ref, {
    root: rootRef.current,
  })

  useEffect(() => {
    if (intersecting && loaded) setAnimate(true)
  }, [intersecting, loaded])

  function onProjectLoad() {
    setLoaded(true)
  }

  return (
    <li ref={ref} className="pb-2">
      <Appear animate={animate}>
        <div className="flex flex-col">
          <Link
            className="relative focus:outline-none"
            to={`/projects/${project.slug.current}`}
            {...events}
          >
            <motion.div
              layoutId={project.title}
              className="w-full overflow-hidden"
              style={{ borderRadius: "32px" }}
            >
              <Media
                {...project.thumbnail}
                intersecting={intersecting}
                load={load}
                onLoad={onProjectLoad}
              />
            </motion.div>
            {/* TODO: awards with `toy` integration */}
            {/* {awardsToShow.length > 0 && (
                  <div className="absolute inset-0">
                    {awardsToShow.map((award, index) => (
                      <span key={index}>award</span>
                    ))}
                  </div>
                )} */}
          </Link>
          <h6 className="desktop:hidden tablet:mt-6 mt-2 text-2xl">
            {project.title}
          </h6>
        </div>
      </Appear>
    </li>
  )
}

export default ProjectThumbnail
