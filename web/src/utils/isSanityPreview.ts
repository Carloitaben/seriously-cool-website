export function isSanityPreview(request: Request) {
  const requestUrl = new URL(request?.url)

  return (
    requestUrl?.searchParams?.get("preview") ===
    process.env.SANITY_PREVIEW_SECRET
  )
}
