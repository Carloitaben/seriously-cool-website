import { Link as RemixLink, useLoaderData } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/node"

import type {
  AboutFirstParagraphVariant,
  GetAboutQuery,
  Scalars,
} from "~/types"

import {
  filterSanityDocumentDrafts,
  getRandomArrayItem,
  isSanityPreview,
} from "~/utils"

import { client, GET_ABOUT } from "~/graphql"

import useRootData from "~/hooks/useRootData"

import TextBlock from "~/components/TextBlock"
import Navbar from "~/components/Navbar"
import Link from "~/components/Link"

type AboutLoaderData = {
  firstParagraph: Omit<AboutFirstParagraphVariant, "_key" | "_type">
  paragraphs: {
    _key: string
    content: Scalars["JSON"][]
  }[]
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<AboutLoaderData> => {
  const preview = isSanityPreview(request)
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
    firstParagraph: randomFirstParagraph,
    paragraphs: randomParagraphs,
  }
}

export default function Route() {
  const { firstParagraph, paragraphs } = useLoaderData<AboutLoaderData>()
  const { literals, theme } = useRootData()

  const fontFamily = theme.fontFamily
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())

    const backgroundColor = theme.background.toUpperCase()
    const textColor = theme.text.toUpperCase()
    const cardColor = theme.card.toUpperCase()

    return (
      <>
        <Navbar goBackRoute="/">
          <RemixLink to="/" className="menuContentVisible:inline-block hidden">
            {literals.close}
          </RemixLink>
          <span className="menuContentVisible:hidden">
            {literals.navLinkAboutLabel}
          </span>
        </Navbar>
        <div className="px-container grid h-full grid-cols-6 gap-x-2 overflow-y-auto pt-12 pb-24 text-5xl">
          <div className="tablet:max-w-4xl col-span-5 max-w-xl">
            <p>
              {literals.aboutFirstParagraphPretitle}{" "}
              <Link href={firstParagraph.firstArtistHref}>
                {firstParagraph.firstArtistName}
              </Link>{" "}
              {literals.aboutFirstParagraphIntertitle}{" "}
              <Link href={firstParagraph.secondArtistHref}>
                {firstParagraph.secondArtistName}
              </Link>
              {". "}
              {literals.aboutFirstParagraphPosttitle}
            </p>
          </div>
          {paragraphs.map((paragraph) => (
            <div
              key={paragraph._key}
              className="tablet:max-w-4xl col-span-5 max-w-xl"
            >
              <br />
              <TextBlock>{paragraph.content}</TextBlock>
            </div>
          ))}
          <div className="tablet:max-w-4xl col-span-5 max-w-xl">
            <br />
            <p>
              {literals.aboutThemeDataPretitle} {fontFamily}{" "}
              {literals.aboutThemeDataIntertitle} {backgroundColor}
              {","} {textColor} {literals.and} {cardColor}
            </p>
          </div>
        </div>
      </>
    )
}
