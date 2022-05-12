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

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }]

export const loader: LoaderFunction = async () => {
  const settings = await getClient().fetch(`*[_type == "settings"][0]`)
  return { settings }
}

export default function App() {
  const { settings } = useLoaderData()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-screen flex flex-col">
        <Layout settings={settings} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
