import type { Context } from "~/types"

export function isSanityPreview(request: Request, context: Context) {
  if (process.env.NODE_ENV === "development") return true

  const requestUrl = new URL(request?.url)

  return (
    requestUrl?.searchParams?.get("preview") ===
    context.SANITY_STUDIO_PREVIEW_SECRET
  )
}
