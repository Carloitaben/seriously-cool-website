import type { FC } from "react"
import { useRef } from "react"

import useRootData from "~/hooks/useRootData"

import Catchphrase from "./Catchphrase"
import ProjectThumbnail from "./ProjectThumbnail"

const HomeProjects: FC = () => {
  const { projects } = useRootData()
  const rootRef = useRef<HTMLElement>(null)

  return (
    <section ref={rootRef} className="flex-1 overflow-y-auto px-1 py-2">
      <div className="flex flex-col">
        <Catchphrase />
        <ul className="grid gap-2">
          {projects.map((project) => (
            <ProjectThumbnail
              key={project.slug.current}
              project={project}
              rootRef={rootRef}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HomeProjects
