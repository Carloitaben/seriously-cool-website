import type { Maybe, Scalars } from "./sanity.types"

export type StripGQLProps<
  T extends {
    __typename?: string
    _key: Maybe<Scalars["String"]>
    _type: Maybe<Scalars["String"]>
  }
> = Omit<T, "__typename" | "_key" | "_type">

export type Context = {
  /**
   * Boolean as string
   */
  SANITY_PREVIEW: string
  SANITY_API_TOKEN: string
  cmsCache: KVNamespace
}
