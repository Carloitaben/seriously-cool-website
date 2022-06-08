const localUrl = `http://localhost:3000`
const remoteUrl = `https://your-deployed-website.com` // TODO
const baseUrl =
  window?.location?.hostname === "localhost" ? localUrl : remoteUrl

export default function resolveProductionUrl(doc, prependSlug?: `/${string}/`) {
  const slug = doc?.slug?.current

  if (!slug) return

  const url = new URL(baseUrl)
  url.pathname = `${prependSlug || ""}${slug}`
  url.searchParams.set(`preview`, process.env.SANITY_STUDIO_PREVIEW_SECRET)

  return url.toString()
}
