import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

const builder = imageUrlBuilder({
  dataset: "production",
  projectId: "823i2uuw",
})

export function getSanityImageSource(source: SanityImageSource) {
  return builder.image(source)
}
