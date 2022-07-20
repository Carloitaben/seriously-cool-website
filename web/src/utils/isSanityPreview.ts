import type { Context } from "~/types"

export function isSanityPreview(request: Request, context: Context) {
  return !!context.SANITY_PREVIEW
}
