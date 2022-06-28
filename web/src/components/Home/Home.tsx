import type { FC } from "react"

import useRootData from "~/hooks/useRootData"

import About from "~/components/About"

import Logo from "./Logo"
import Catchphrase from "./Catchphrase"
import ProjectThumbnail from "./ProjectThumbnail"

const Home: FC = () => {
  const { projects } = useRootData()

  return (
    <div className="desktop:pl-[50%] homeMaxWidth:pl-[60rem] overflow-hidden">
      <main className="desktop:pr-2 px-1 pt-2 pb-24">
        <section className="flex flex-col">
          <Logo />
          {/* <Catchphrase /> */}
          <About />
          <ul className="projects-grid desktop:-mx-1 desktop:-mb-2 grid">
            {projects.map((project) => (
              <ProjectThumbnail key={project.slug.current} project={project} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Home
