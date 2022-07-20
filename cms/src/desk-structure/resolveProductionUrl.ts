const localUrl = `http://localhost:3000`
const remoteUrl = `https://main.seriously-cool-website.pages.dev/`
const baseUrl =
  window?.location?.hostname === "localhost" ? localUrl : remoteUrl

export default function resolveProductionUrl(doc, prependSlug?: `/${string}/`) {
  const slug = doc?.slug?.current

  if (!slug) return

  const url = new URL(baseUrl)
  url.pathname = `${prependSlug || ""}${slug}`
  return url.toString()
}
