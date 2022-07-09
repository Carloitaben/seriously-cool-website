import type { LoaderFunction } from "@remix-run/cloudflare"

import Error from "~/components/Error"

export const loader: LoaderFunction = async () => {
  throw new Response("Page not found", { status: 404 })
}

export const ErrorBoundary = () => <Error />

export const CatchBoundary = () => <Error />

export default function Route() {
  return null
}
