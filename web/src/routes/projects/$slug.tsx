import type { LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import type { GetProjectQuery, GetProjectQueryVariables } from "~/types"

import { client, GET_PROJECT } from "~/graphql"
import useRootData from "~/hooks/useRootData"

import Appear from "~/components/Appear"
import AppearText from "~/components/AppearText"
import Navbar from "~/components/Navbar"
import TextBlock from "~/components/TextBlock"
import ProjectDetailClientLocation from "~/components/ProjectDetailClientLocation"
import ProjectDetailBlocks from "~/components/ProjectDetailBlocks"
import { useState } from "react"

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
  const { literals } = useRootData()

  const [finishedTitleAnimation, setFinishedTitleAnimation] = useState(false)

  return (
    <>
      <Navbar goBackRoute="/projects">
        <Link to="/projects" className="menuContentVisible:inline-block hidden">
          {literals.close}
        </Link>
        <span className="menuContentVisible:hidden" />
      </Navbar>
      <div className="h-full overflow-y-auto">
        <div className="px-container mt-12 mb-24 grid grid-cols-6 gap-x-2 text-2xl">
          <div className="col-span-3 max-w-xl text-5xl leading-tight">
            <h1>
              <AppearText
                onAnimationStart={() => setFinishedTitleAnimation(true)}
              >
                {project.title}
              </AppearText>
            </h1>
          </div>
          <Appear animate={finishedTitleAnimation}>
            <div className="col-span-3 max-w-2xl">
              <TextBlock>{project.descriptionRaw}</TextBlock>
            </div>
          </Appear>
        </div>
        <ProjectDetailBlocks>{project.blocks}</ProjectDetailBlocks>
        <div className="px-container grid grid-cols-6 gap-x-2 text-2xl">
          <ProjectDetailClientLocation
            client={project.clientRaw}
            location={project.location}
            year={project.year}
          />
        </div>
      </div>
    </>
  )
}
