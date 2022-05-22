export function isSanityPreview(request: Request) {
  if (process.env.NODE_ENV === "development") return true

  const requestUrl = new URL(request?.url)

  return (
    requestUrl?.searchParams?.get("preview") ===
    process.env.SANITY_STUDIO_PREVIEW_SECRET
  )
}
