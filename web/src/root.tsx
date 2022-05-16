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

import styles from "~/styles/index.css"

import Layout from "~/components/Layout"

import { getRandomArrayItem } from "~/utils"
import { client, GET_SETTINGS } from "~/graphql"
import type {
  GetSettingsQuery,
  GetSettingsQueryVariables,
  SettingsCatchphrase,
} from "~/types/sanity"

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

  const theme = {
    fontFamily,
    background: background.hex,
    accent: accent.hex,
  }

  return { slidingTexts, catchPhrase, theme }
}

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

export default function App() {
  const { theme } = useLoaderData<RootLoaderData>()

  const style = {
    fontFamily: theme.fontFamily,
  }

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-screen flex flex-col" style={style}>
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
