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

import { getClient } from "~/utils/sanity/getClient"
import { getRandomArrayItem } from "~/utils"

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

export const loader: LoaderFunction = async () => {
  const settings = await getClient().fetch(`*[_type == "settings"][0]`)

  const fontFamily = getRandomArrayItem(settings.typefaces)

  const theme = {
    fontFamily,
  }

  return { settings, theme }
}

export default function App() {
  const { settings, theme } = useLoaderData()

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
        <Layout settings={settings} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
