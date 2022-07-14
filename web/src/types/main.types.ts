import type { Maybe, Scalars } from "./sanity.types"

export type StripGQLProps<
  T extends {
    __typename?: string
    _key: Maybe<Scalars["String"]>
    _type: Maybe<Scalars["String"]>
  }
> = Omit<T, "__typename" | "_key" | "_type">

export type Context = {
  SANITY_API_TOKEN: string
  SANITY_STUDIO_PREVIEW_SECRET: string
  cmsCache: KVNamespace
}