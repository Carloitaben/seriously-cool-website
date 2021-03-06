import type { LoaderFunction } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { getFileAsset } from "@sanity/asset-utils"

import type { GetProjectQuery, GetProjectQueryVariables } from "~/types"
import { get, filterSanityDocumentDrafts, isSanityPreview } from "~/utils"
import { dataset, projectId, GET_PROJECT } from "~/graphql"

import Error from "~/components/Error"
import ProjectDetail from "~/components/ProjectDetail"

export type ProjectDetailLoaderData = {
  project: GetProjectQuery["allProject"][number]
}

function reducer(response: GetProjectQuery, preview: boolean) {
  const [project] = filterSanityDocumentDrafts(response.allProject, preview)

  const projectBlocksWithFileAssets = project.blocks.map((block) => {
    switch (block.__typename) {
      case "Media":
        if (block.kind !== "IMAGE") {
          block.video.asset = getFileAsset(block.video.mp4, {
            dataset,
            projectId,
            useVanityName: true,
          })
        }

        return block
      case "ProjectBlockMedia":
        block.mediaBlockBlocks = block.mediaBlockBlocks.map((b) => {
          if (b.kind !== "IMAGE") {
            b.video.asset = getFileAsset(b.video.mp4, {
              dataset,
              projectId,
              useVanityName: true,
            })
          }

          return b
        })

        return block
      default:
        return block
    }
  })

  return {
    ...project,
    blocks: projectBlocksWithFileAssets,
  }
}

export const loader: LoaderFunction = async ({
  params,
  request,
  context,
}): Promise<ProjectDetailLoaderData> => {
  if (!params?.slug) {
    throw new Response("Slug is required", { status: 400 })
  }

  const { slug } = params
  const preview = isSanityPreview(request, context)
  const variables: GetProjectQueryVariables = { slug }

  try {
    const project = await get({
      gql: GET_PROJECT,
      key: `get-project-${slug}`,
      preview,
      context,
      reducer,
      variables,
    })

    return { project }
  } catch (error) {
    throw new Response("Project not found", { status: 404 })
  }
}

export const ErrorBoundary = () => <Error />

export const CatchBoundary = () => <Error />

export default function Route() {
  const { project } = useLoaderData<ProjectDetailLoaderData>()

  return <ProjectDetail project={project} />
}
