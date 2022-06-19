import { client, GET_SETTINGS } from "~/graphql"

import {
  filterSanityDocumentDrafts,
  getRandomArrayItem,
  getRandomToy,
} from "~/utils"

import type {
  GetSettingsQuery,
  Scalars,
  SettingsCatchphrase,
  SettingsLiteral,
  StripGQLProps,
  Toy,
} from "~/types"

export type LoaderSettingsData = {
  slidingTexts: string[]
  errorText: string
  literals: Record<string, string>
  catchphrase: {
    desktop: Scalars["JSON"]
    mobile: Scalars["JSON"]
  }
  theme: {
    fontFamily: string
    toy: Toy
    colors: {
      background: string
      text: string
      card: string
    }
  }
}

function reduceCatchphrases(
  catchphrases: StripGQLProps<SettingsCatchphrase>[]
) {
  return catchphrases.reduce<Record<string, typeof catchphrases>>(
    (accumulator, catchphrase) => {
      if (["BOTH", "DESKTOP"].includes(catchphrase.visibility)) {
        accumulator.catchphrasesDesktop.push(catchphrase)
      }

      if (["BOTH", "MOBILE"].includes(catchphrase.visibility)) {
        accumulator.catchphrasesMobile.push(catchphrase)
      }

      return accumulator
    },
    {
      catchphrasesDesktop: [],
      catchphrasesMobile: [],
    }
  )
}

function reduceLiterals(literals: StripGQLProps<SettingsLiteral>[]) {
  return literals.reduce<Record<string, string>>(
    (accumulator, { key, value }) => {
      if (key in accumulator) {
        throw Error(`found duplicated literal "${key}"`)
      }

      accumulator[key] = value
      return accumulator
    },
    {}
  )
}

export async function getLoaderSettingsData(
  preview: boolean
): Promise<LoaderSettingsData> {
  const response = await client.request<GetSettingsQuery>(GET_SETTINGS)

  const [
    {
      catchphrases,
      colors,
      slidingTexts,
      errorTexts,
      typefaces,
      toys,
      literals,
    },
  ] = filterSanityDocumentDrafts(response.allSettings, preview)

  const { catchphrasesDesktop, catchphrasesMobile } =
    reduceCatchphrases(catchphrases)

  const catchphraseDesktop = getRandomArrayItem(catchphrasesDesktop)
  const catchphraseMobile = getRandomArrayItem(catchphrasesMobile)
  const fontFamily = getRandomArrayItem(typefaces)
  const errorText = getRandomArrayItem(errorTexts)
  const toy = getRandomToy(toys)

  const { background, text, card } = getRandomArrayItem(colors)

  const theme = {
    toy,
    fontFamily,
    colors: {
      background: background.hex,
      text: text.hex,
      card: card.hex,
    },
  }

  const formattedLiterals = reduceLiterals(literals)

  return {
    theme,
    slidingTexts,
    errorText,
    literals: formattedLiterals,
    catchphrase: {
      desktop: catchphraseDesktop.textRaw,
      mobile: catchphraseMobile.textRaw,
    },
  }
}
