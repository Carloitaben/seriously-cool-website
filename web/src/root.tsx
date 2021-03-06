import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react"
import type { CSSProperties } from "react"
import { useIsomorphicLayoutEffect } from "framer-motion"

import styles from "~/styles/index.css"
import SlidingText from "~/components/SlidingText"
import Cursor from "~/components/Cursor"
import useOnMatchMedia from "~/hooks/useOnMatchMedia"
import { getRandomArrayItem, isSanityPreview } from "~/utils"

import type {
  LoaderAboutData,
  LoaderProjectsData,
  LoaderSettingsData,
} from "./utils"

import {
  getLoaderAboutData,
  getLoaderProjectsData,
  getLoaderSettingsData,
} from "./utils"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon-black.png",
    type: "image/png",
  },
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "preload",
    as: "style",
    href: "https://use.typekit.net/jvo7aft.css",
  },
  {
    rel: "stylesheet",
    href: "https://use.typekit.net/jvo7aft.css",
  },
]

export type RootLoaderData = LoaderSettingsData &
  LoaderProjectsData &
  LoaderAboutData & {
    cursor: string
  }

export const loader: LoaderFunction = async ({
  request,
  context,
}): Promise<RootLoaderData> => {
  const preview = isSanityPreview(request, context)

  const [loaderAboutData, loaderProjectsData, loaderSettingsData] =
    await Promise.all([
      getLoaderAboutData(preview, context),
      getLoaderProjectsData(preview, context),
      getLoaderSettingsData(preview, context),
    ])

  const cursor = getRandomArrayItem(["arrow", "finger", "sword"])

  return {
    ...loaderAboutData,
    ...loaderProjectsData,
    ...loaderSettingsData,
    cursor,
  }
}

export default function App() {
  const { theme, slidingTexts, cursor } = useLoaderData<RootLoaderData>()

  useIsomorphicLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-colors-background",
      theme.colors.background
    )

    document.documentElement.style.setProperty(
      "--theme-colors-text",
      theme.colors.text
    )

    document.documentElement.style.setProperty(
      "--theme-colors-card",
      theme.colors.card
    )
  }, [theme.colors.background, theme.colors.text, theme.colors.card])

  useOnMatchMedia("(prefers-color-scheme: dark)", (matches) => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')

    if (!link) return

    if (matches) {
      link.href = "/favicon-white.png"
    } else {
      link.href = "/favicon-black.png"
    }
  })

  const style: CSSProperties = {
    fontFamily: theme.fontFamily,
    background: theme.colors.background,
    color: theme.colors.text,
  }

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body
        className="selection:bg-text selection:text-background tablet:text-2xl text-lg"
        style={style}
      >
        <Outlet />
        <SlidingText>{slidingTexts}</SlidingText>
        <Cursor cursor={cursor} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
