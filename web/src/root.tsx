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
import {
  LazyMotion,
  domAnimation,
  useIsomorphicLayoutEffect,
} from "framer-motion"
import type { CSSProperties } from "react"

import styles from "~/styles/index.css"

import {
  getRandomArrayItem,
  getRandomToy,
  isSanityPreview,
  filterSanityDocumentDrafts,
} from "~/utils"

import type { GetSettingsQuery, SettingsCatchphrase, Toy } from "./types"
import { client, GET_SETTINGS } from "~/graphql"
import Layout from "~/components/Layout"
import useOnMatchMedia from "~/hooks/useOnMatchMedia"

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
    rel: "stylesheet",
    href: "https://use.typekit.net/jvo7aft.css",
  },
]

export type RootLoaderData = {
  slidingTexts: string[]
  literals: Record<string, string>
  catchphrase: {
    desktop: Pick<SettingsCatchphrase, "textRaw" | "visibility">
    mobile: Pick<SettingsCatchphrase, "textRaw" | "visibility">
  }
  theme: {
    fontFamily: string
    background: string
    text: string
    card: string
    toy: Toy
  }
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<RootLoaderData> => {
  const preview = isSanityPreview(request)
  const response = await client.request<GetSettingsQuery>(GET_SETTINGS)

  const [{ catchphrases, colors, slidingTexts, typefaces, toys, literals }] =
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

  const { background, text, card } = getRandomArrayItem(colors)

  const theme = {
    toy,
    fontFamily,
    background: background.hex,
    text: text.hex,
    card: card.hex,
  }

  const formattedLiterals = literals.reduce<Record<string, string>>(
    (accumulator, { key, value }) => {
      if (key in accumulator) {
        throw Error(`found duplicated literal "${key}"`)
      }

      accumulator[key] = value
      return accumulator
    },
    {}
  )

  return {
    theme,
    slidingTexts,
    literals: formattedLiterals,
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
    color: theme.text,
  }

  useIsomorphicLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-colors-background",
      theme.background
    )

    document.documentElement.style.setProperty(
      "--theme-colors-text",
      theme.text
    )

    document.documentElement.style.setProperty(
      "--theme-colors-card",
      theme.card
    )
  }, [theme.background, theme.text, theme.card])

  useOnMatchMedia("(prefers-color-scheme: dark)", (matches) => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')

    if (!link) return

    if (matches) {
      link.href = "/favicon-white.png"
    } else {
      link.href = "/favicon-black.png"
    }
  })

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body
        className="selection:bg-text selection:text-background flex h-screen flex-col"
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
