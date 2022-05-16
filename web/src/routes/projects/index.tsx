import type { LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import { client, GET_PROJECTS } from "~/graphql"
import type { GetProjectsQuery } from "~/types/sanity"

import Navbar from "~/components/Navbar"

type ProjectsLoaderData = {
  projects: GetProjectsQuery["allProject"]
}

export const loader: LoaderFunction = async (): Promise<ProjectsLoaderData> => {
  const response = await client.request<GetProjectsQuery>(GET_PROJECTS)
  return { projects: response.allProject }
}

export default function Route() {
  const { projects } = useLoaderData<ProjectsLoaderData>()

  return (
    <>
      <Navbar>
        <Link to="/">Close</Link>
      </Navbar>
      <div>
        <h1>Projects</h1>
        <ul>
          <li>{projects.map((project) => project.slug.current)}</li>
        </ul>
      </div>
    </>
  )
}
