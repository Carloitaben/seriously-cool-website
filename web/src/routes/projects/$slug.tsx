import type { LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import { client, GET_PROJECT } from "~/graphql"
import type { GetProjectQuery, GetProjectQueryVariables } from "~/types"

import Navbar from "~/components/Navbar"
import TextBlock from "~/components/TextBlock"
import ProjectDetailClientLocation from "~/components/ProjectDetailClientLocation"

type ProjectDetailLoaderData = {
  project: GetProjectQuery["allProject"][number]
}

export const loader: LoaderFunction = async ({
  context,
  params,
  request,
}): Promise<ProjectDetailLoaderData> => {
  if (!params?.slug) throw Error("Slug is required")

  const getProjectVariables: GetProjectQueryVariables = {
    slug: params.slug,
  }

  const {
    allProject: [project],
  } = await client.request<GetProjectQuery>(GET_PROJECT, getProjectVariables)

  return { project }
}

export default function Route() {
  const { project } = useLoaderData<ProjectDetailLoaderData>()

  return (
    <>
      <Navbar>
        <Link to="/projects">Close</Link>
      </Navbar>
      <div className="px-container mt-12 mb-24 grid grid-cols-6 gap-x-2 text-2xl">
        <div className="col-span-3 max-w-xl text-5xl leading-tight">
          <h1>{project.title}</h1>
        </div>
        <div className="col-span-3 max-w-2xl">
          <TextBlock>{project.descriptionRaw}</TextBlock>
        </div>
      </div>
      <div className="px-container grid grid-cols-6 gap-x-2 text-2xl">
        <ProjectDetailClientLocation
          client={project.clientRaw}
          location={project.location}
          year={project.year}
        />
      </div>
    </>
  )
}
