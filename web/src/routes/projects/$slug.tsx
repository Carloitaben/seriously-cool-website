import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getFileAsset } from "@sanity/asset-utils"

import type { GetProjectQuery, GetProjectQueryVariables } from "~/types"
import { filterSanityDocumentDrafts, isSanityPreview } from "~/utils"
import { client, dataset, projectId, GET_PROJECT } from "~/graphql"
import ProjectDetail from "~/components/ProjectDetail"

export type ProjectDetailLoaderData = {
  project: GetProjectQuery["allProject"][number]
}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<ProjectDetailLoaderData> => {
  if (!params?.slug) throw Error("Slug is required")

  const getProjectVariables: GetProjectQueryVariables = {
    slug: params.slug,
  }

  const preview = isSanityPreview(request)

  const response = await client.request<GetProjectQuery>(
    GET_PROJECT,
    getProjectVariables
  )

  const [project] = filterSanityDocumentDrafts(response.allProject, preview)

  const projectBlocksWithFileAssets = project.blocks.map((block) => {
    switch (block.__typename) {
      case "ProjectBlockRichText":
        return block
      case "Media":
        if (block.kind !== "IMAGE") {
          block.video.asset = getFileAsset(block.video.mp4, {
            dataset,
            projectId,
            useVanityName: true,
          })
        }

        return block
      default:
        return block
    }
  })

  const projectsWithFileAssets = {
    ...project,
    blocks: projectBlocksWithFileAssets,
  }

  return { project: projectsWithFileAssets }
}

export default function Route() {
  const { project } = useLoaderData<ProjectDetailLoaderData>()

  return <ProjectDetail project={project} />
}
