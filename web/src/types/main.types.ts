import type { Maybe, Scalars, SettingsToys } from "./sanity.types"

export type StripGQLProps<
  T extends {
    __typename?: string
    _key: Maybe<Scalars["String"]>
    _type: Maybe<Scalars["String"]>
  }
> = Omit<T, "__typename" | "_key" | "_type">

/**
 * The toy object type from Sanity without GraphQL properties.
 * This should grow automatically with new toys as we are not picking them
 * explicitly but rather omitting everything else.
 */
export type ToyObject = StripGQLProps<SettingsToys>

/**
 * A toy. The theme generator will pick one randomly
 */
export type Toy = keyof ToyObject
