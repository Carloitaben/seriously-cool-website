import { useEffect, useState } from "react"
import type { LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import { client, GET_PROJECTS } from "~/graphql"
import type { GetProjectsQuery } from "~/types/sanity"

import store from "~/store"

import Navbar from "~/components/Navbar"

type ProjectsLoaderData = {
  projects: GetProjectsQuery["allProject"]
}

export const loader: LoaderFunction = async (): Promise<ProjectsLoaderData> => {
  const response = await client.request<GetProjectsQuery>(GET_PROJECTS)
  return { projects: response.allProject }
}

export default function Route() {
  const loaderData = useLoaderData<ProjectsLoaderData>()
  const setSlidingText = store((state) => state.setSlidingText)

  const [projects, setProjects] = useState<ProjectsLoaderData["projects"]>([])

  // This is a workaround for a bug in Remix with `AnimatePresence`
  // I'll add the issue here when I report it
  useEffect(() => {
    if (loaderData?.projects) setProjects(loaderData.projects)
  }, [loaderData])

  return (
    <>
      <Navbar>
        <Link to="/">Close</Link>
      </Navbar>
      <ul className="px-container grid grid-cols-6 -mx-1 -mb-2">
        {projects.map((project) => (
          <li key={project.slug.current} className="col-span-3">
            <Link
              className="px-1 pb-2 block"
              to={project.slug.current}
              onMouseEnter={() => setSlidingText(project.title)}
              onMouseLeave={() => setSlidingText(null)}
              onFocus={() => setSlidingText(project.title)}
              onBlur={() => setSlidingText(null)}
              onClick={() => setSlidingText(null)}
            >
              <div className="bg-green-500">
                {projects.map((project) => project.slug.current)}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
