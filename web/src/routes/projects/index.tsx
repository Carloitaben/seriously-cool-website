import { useEffect, useRef, useState } from "react"
import type { LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { getFileAsset } from "@sanity/asset-utils"

import type { GetProjectsQuery } from "~/types"
import { client, dataset, projectId, GET_PROJECTS } from "~/graphql"
import { isSanityPreview, filterSanityDocumentDrafts } from "~/utils"
import store from "~/store"

import Navbar from "~/components/Navbar"
import ProjectThumbnail from "~/components/ProjectThumbnail"
import useGroupProjectsAnimations from "~/hooks/useGroupProjectsAnimations"

export type ProjectsLoaderData = {
  projects: GetProjectsQuery["allProject"]
}

function useSkipAppear() {
  const [skipAppear, setSkipAppear] = useState(false)

  useEffect(() => {
    const skip = store.getState().skipProjectsAppear
    setSkipAppear(skip)
  }, [])

  return skipAppear
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<ProjectsLoaderData> => {
  const preview = isSanityPreview(request)
  const response = await client.request<GetProjectsQuery>(GET_PROJECTS)
  const projects = filterSanityDocumentDrafts(response.allProject, preview)

  const projectsWithFileAssets = projects.map((project) => {
    switch (project?.thumbnail?.kind) {
      case "VIDEO_GIF":
        project.thumbnail.video.asset = getFileAsset(
          project.thumbnail.video.mp4,
          { dataset, projectId, useVanityName: true }
        )
        break
      default:
        console.log("unhandled thumbnail kind", project?.thumbnail?.kind)
        break
    }

    return project
  })

  return { projects: projectsWithFileAssets }
}

export default function Route() {
  const loaderData = useLoaderData<ProjectsLoaderData>()
  const skipAppear = useSkipAppear()

  const ref = useRef<HTMLUListElement>(null)
  const [projects, setProjects] = useState<ProjectsLoaderData["projects"]>([])

  // This is a workaround for a bug in Remix with `AnimatePresence`
  // I'll add the issue here when I report it
  useEffect(() => {
    if (loaderData?.projects) setProjects(loaderData.projects)
  }, [loaderData])

  const { onProjectLoad, animateProjects } = useGroupProjectsAnimations({
    ref,
    projects,
  })

  return (
    <>
      <Navbar>
        <Link to="/">Close</Link>
      </Navbar>
      <ul
        ref={ref}
        className="px-container desktop:-mx-1 grid h-full grid-cols-6 overflow-y-auto pb-[2.375rem] pt-0.5"
      >
        {projects.map((project, index) => (
          <ProjectThumbnail
            key={project.slug.current}
            project={project}
            onLoad={() => onProjectLoad(index)}
            animate={index in animateProjects}
            skipAppear={skipAppear}
          />
        ))}
      </ul>
    </>
  )
}
