import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react"
import type { CSSProperties } from "react"
import { useEffect } from "react"

import styles from "~/styles/index.css"

import {
  getRandomArrayItem,
  getRandomToy,
  isSanityPreview,
  filterSanityDocumentDrafts,
} from "~/utils"

import type { GetSettingsQuery, SettingsCatchphrase } from "~/types/sanity"
import type { Toy } from "./types"

import { client, GET_SETTINGS } from "~/graphql"

import Layout from "~/components/Layout"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: "https://use.typekit.net/jvo7aft.css",
  },
]

export type RootLoaderData = {
  slidingTexts: string[]
  catchphrase: {
    desktop: Pick<SettingsCatchphrase, "textRaw" | "visibility">
    mobile: Pick<SettingsCatchphrase, "textRaw" | "visibility">
  }
  theme: {
    fontFamily: string
    background: string
    accent: string
    toy: Toy
  }
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<RootLoaderData> => {
  const preview = isSanityPreview(request)
  const response = await client.request<GetSettingsQuery>(GET_SETTINGS)

  const [{ catchphrases, colors, slidingTexts, typefaces, toys }] =
    filterSanityDocumentDrafts(response.allSettings, preview)

  const { catchphrasesDesktop, catchphrasesMobile } = catchphrases.reduce<
    Record<string, typeof catchphrases>
  >(
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

  const catchphraseDesktop = getRandomArrayItem(catchphrasesDesktop)
  const catchphraseMobile = getRandomArrayItem(catchphrasesMobile)
  const fontFamily = getRandomArrayItem(typefaces)
  const toy = getRandomToy(toys)

  const { background, accent } = getRandomArrayItem(colors)
  const flipColors = Math.random() < 0.5

  const theme = {
    toy,
    fontFamily,
    background: flipColors ? background.hex : accent.hex,
    accent: flipColors ? accent.hex : background.hex,
  }

  return {
    theme,
    slidingTexts,
    catchphrase: {
      desktop: catchphraseDesktop,
      mobile: catchphraseMobile,
    },
  }
}

export default function App() {
  const { theme } = useLoaderData<RootLoaderData>()

  const style: CSSProperties = {
    fontFamily: theme.fontFamily,
    background: theme.background,
    color: theme.accent,
  }

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-colors-background",
      theme.background
    )

    document.documentElement.style.setProperty(
      "--theme-colors-accent",
      theme.accent
    )
  }, [theme.accent, theme.background])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body
        className="h-screen flex flex-col selection:bg-accent selection:text-background"
        style={style}
      >
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
