import { getFileAsset } from "@sanity/asset-utils"

import { getClient, dataset, projectId, GET_PROJECTS } from "~/graphql"

import { filterSanityDocumentDrafts } from "~/utils"

import type { Context, GetProjectQuery, GetProjectsQuery } from "~/types"

export type LoaderProjectsData = {
  projects: GetProjectQuery["allProject"]
}

export async function getLoaderProjectsData(
  preview: boolean,
  context: Context
): Promise<LoaderProjectsData> {
  const client = getClient(context)
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
