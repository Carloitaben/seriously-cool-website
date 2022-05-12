import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node"
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react"

import styles from "~/styles/index.css"

import { getClient } from "~/utils/sanity/getClient"

import SlidingText from "./components/SlidingText"

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
      <body>
        <SlidingText>{settings.slidingTexts}</SlidingText>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
