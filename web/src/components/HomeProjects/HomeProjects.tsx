import type { FC } from "react"
import { useRef } from "react"

import useRootData from "~/hooks/useRootData"

import Logo from "./Logo"
import Catchphrase from "./Catchphrase"
import ProjectThumbnail from "./ProjectThumbnail"

const HomeProjects: FC = () => {
  const { projects } = useRootData()
  const rootRef = useRef<HTMLElement>(null)

  return (
    <main ref={rootRef} className="flex-1 overflow-y-auto px-1 pt-2 pb-24">
      <section className="flex flex-col">
        <Logo />
        {/* <Catchphrase /> */}
        <ul className="-mb-2 flex flex-col">
          {projects.map((project) => (
            <ProjectThumbnail
              key={project.slug.current}
              project={project}
              rootRef={rootRef}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default HomeProjects
