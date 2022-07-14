import { GET_SETTINGS } from "~/graphql"

import { get, filterSanityDocumentDrafts, getRandomArrayItem } from "~/utils"

import type {
  Context,
  GetSettingsQuery,
  Scalars,
  SettingsCatchphrase,
  SettingsLiteral,
  StripGQLProps,
} from "~/types"

export type LoaderSettingsData = {
  slidingTexts: string[]
  slidingTextsError: string[]
  errorText: string
  literals: Record<string, string>
  catchphrase: {
    desktop: Scalars["JSON"]
    mobile: Scalars["JSON"]
  }
  theme: {
    fontFamily: string
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

function reducer(response: GetSettingsQuery, preview: boolean) {
  const [
    {
      catchphrases,
      colors,
      slidingTexts,
      slidingTextsError,
      errorTexts,
      typefaces,
      literals,
    },
  ] = filterSanityDocumentDrafts(response.allSettings, preview)

  return {
    catchphrases,
    colors,
    slidingTexts,
    slidingTextsError,
    errorTexts,
    typefaces,
    literals,
  }
}

export async function getLoaderSettingsData(
  preview: boolean,
  context: Context
): Promise<LoaderSettingsData> {
  const response = await get({
    gql: GET_SETTINGS,
    key: "getSettings",
    preview,
    context,
    reducer,
  })

  const { catchphrasesDesktop, catchphrasesMobile } = reduceCatchphrases(
    response.catchphrases
  )

  const catchphraseDesktop = getRandomArrayItem(catchphrasesDesktop)
  const catchphraseMobile = getRandomArrayItem(catchphrasesMobile)
  const fontFamily = getRandomArrayItem(response.typefaces)
  const errorText = getRandomArrayItem(response.errorTexts)

  const { background, text, card } = getRandomArrayItem(response.colors)

  const theme = {
    fontFamily,
    colors: {
      background: background.hex,
      text: text.hex,
      card: card.hex,
    },
  }

  const formattedLiterals = reduceLiterals(response.literals)

  return {
    theme,
    slidingTexts: response.slidingTexts,
    slidingTextsError: response.slidingTextsError,
    errorText,
    literals: formattedLiterals,
    catchphrase: {
      desktop: catchphraseDesktop.textRaw,
      mobile: catchphraseMobile.textRaw,
    },
  }
}
