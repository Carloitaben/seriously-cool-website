import { client, GET_ABOUT } from "~/graphql"

import { filterSanityDocumentDrafts, getRandomArrayItem } from "~/utils"

import type {
  AboutFirstParagraphVariant,
  GetAboutQuery,
  Scalars,
  StripGQLProps,
} from "~/types"

export type LoaderAboutData = {
  about: {
    firstParagraph: StripGQLProps<AboutFirstParagraphVariant>
    paragraphs: {
      _key: string
      content: Scalars["JSON"][]
    }[]
  }
}

export async function getLoaderAboutData(
  preview: boolean
): Promise<LoaderAboutData> {
  const response = await client.request<GetAboutQuery>(GET_ABOUT)

  const [{ firstParagraph, paragraphs }] = filterSanityDocumentDrafts(
    response.allAbout,
    preview
  )

  const randomFirstParagraph = getRandomArrayItem(firstParagraph)

  const randomParagraphs = paragraphs.flatMap(({ _key, paragraphs }) => {
    const { variantsRaw } = getRandomArrayItem(paragraphs)

    return {
      _key,
      content: variantsRaw,
    }
  })

  return {
    about: {
      firstParagraph: randomFirstParagraph,
      paragraphs: randomParagraphs,
    },
  }
}
