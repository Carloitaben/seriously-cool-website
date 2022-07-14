import { GET_ABOUT } from "~/graphql"

import { get, filterSanityDocumentDrafts, getRandomArrayItem } from "~/utils"

import type {
  AboutFirstParagraphVariant,
  Context,
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

function reducer(response: GetAboutQuery, preview: boolean) {
  const [{ firstParagraph, paragraphs }] = filterSanityDocumentDrafts(
    response.allAbout,
    preview
  )
  return {
    firstParagraph,
    paragraphs,
  }
}

export async function getLoaderAboutData(
  preview: boolean,
  context: Context
): Promise<LoaderAboutData> {
  const response = await get({
    gql: GET_ABOUT,
    key: "getAbout",
    preview,
    context,
    reducer,
  })

  const randomFirstParagraph = getRandomArrayItem(response.firstParagraph)

  const randomParagraphs = response.paragraphs.flatMap(
    ({ _key, paragraphs }) => {
      const { variantsRaw } = getRandomArrayItem(paragraphs)

      return {
        _key,
        content: variantsRaw,
      }
    }
  )

  return {
    about: {
      firstParagraph: randomFirstParagraph,
      paragraphs: randomParagraphs,
    },
  }
}
