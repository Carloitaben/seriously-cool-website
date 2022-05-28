import type { SettingsToys } from "./sanity.types"

/**
 * The toy object type from Sanity without GraphQL properties.
 * This should grow automatically with new toys as we are not picking them
 * explicitly but rather omitting everything else.
 */
export type ToyObject = Omit<SettingsToys, "__typename" | "_key" | "_type">

/**
 * A toy. The theme generator will pick one randomly
 */
export type Toy = keyof ToyObject

