import { useState } from "react"
import { getFileAsset } from "@sanity/asset-utils"
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import type { GetProjectQuery, GetProjectQueryVariables } from "~/types"
import { filterSanityDocumentDrafts, isSanityPreview } from "~/utils"
import { client, dataset, projectId, GET_PROJECT } from "~/graphql"

import Appear from "~/components/Appear"
import AppearText from "~/components/AppearText"
import TextBlock from "~/components/TextBlock"
import ProjectDetailThumbnail from "~/components/ProjectDetailThumbnail"
import ProjectDetailClientLocation from "~/components/ProjectDetailClientLocation"
import ProjectDetailBlocks from "~/components/ProjectDetailBlocks"

export type ProjectDetailLoaderData = {
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

  const preview = isSanityPreview(request)

  const response = await client.request<GetProjectQuery>(
    GET_PROJECT,
    getProjectVariables
  )

  const [project] = filterSanityDocumentDrafts(response.allProject, preview)

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

  const [finishedTitleAnimation, setFinishedTitleAnimation] = useState(false)

  return (
    <>
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
          <Appear
            animate={finishedTitleAnimation}
            className="col-span-3 max-w-2xl"
          >
            <TextBlock>{project.descriptionRaw}</TextBlock>
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
