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

import Layout from "~/components/Layout"

import { getRandomArrayItem } from "~/utils"
import { client, GET_SETTINGS } from "~/graphql"

import type {
  GetSettingsQuery,
  GetSettingsQueryVariables,
  SettingsCatchphrase,
} from "~/types/sanity"

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
  catchPhrase: Pick<SettingsCatchphrase, "textRaw" | "visibility">
  theme: {
    fontFamily: string
    background: string
    accent: string
  }
}

export const loader: LoaderFunction = async (): Promise<RootLoaderData> => {
  const getSettingsVariables: GetSettingsQueryVariables = {
    id: "settings",
  }

  const {
    Settings: { typefaces, slidingTexts, colors, catchphrases },
  } = await client.request<GetSettingsQuery>(GET_SETTINGS, getSettingsVariables)

  const catchPhrase = getRandomArrayItem(catchphrases)
  const fontFamily = getRandomArrayItem(typefaces)
  const { background, accent } = getRandomArrayItem(colors)
  const flipColors = Math.random() < 0.5

  const theme = {
    fontFamily,
    background: flipColors ? background.hex : accent.hex,
    accent: flipColors ? accent.hex : background.hex,
  }

  return { slidingTexts, catchPhrase, theme }
}

export default function App() {
  const { theme } = useLoaderData<RootLoaderData>()

  const style: CSSProperties = {
    fontFamily: theme.fontFamily,
    background: theme.background,
    color: theme.accent,
  }

  // TODO: maybe we don't need this? Remove if not necessary
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
