import { getFileAsset } from "@sanity/asset-utils"

import { dataset, projectId, GET_PROJECTS } from "~/graphql"

import { get, filterSanityDocumentDrafts } from "~/utils"

import type { Context, GetProjectQuery, GetProjectsQuery } from "~/types"

export type LoaderProjectsData = {
  projects: GetProjectQuery["allProject"]
}

function reducer(response: GetProjectsQuery, preview: boolean) {
  const projects = filterSanityDocumentDrafts(response.allProject, preview)

  return projects.map((project) => {
    switch (project?.thumbnail?.kind) {
      case "VIDEO_GIF":
        project.thumbnail.video.asset = getFileAsset(
          project.thumbnail.video.mp4,
          { dataset, projectId, useVanityName: true }
        )
        break
      default:
        console.warn("unhandled thumbnail kind", project?.thumbnail?.kind)
    }

    return project
  })
}

export async function getLoaderProjectsData(
  preview: boolean,
  context: Context
): Promise<LoaderProjectsData> {
  const projects = await get({
    gql: GET_PROJECTS,
    key: "get-projects",
    preview,
    context,
    reducer,
  })

  return { projects }
}
