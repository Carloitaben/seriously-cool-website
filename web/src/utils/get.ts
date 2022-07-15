import { getClient } from "~/graphql"
import type { Context } from "~/types"

async function getFromCms<
  Reducer extends (response: any, preview: boolean) => any
>({
  gql,
  variables,
  context,
  preview,
  reducer,
}: {
  gql: string
  variables?: any
  context: Context
  preview: boolean
  reducer: Reducer
}): Promise<ReturnType<Reducer>> {
  const client = getClient(context)
  const response = await client.request<Parameters<Reducer>[0]>(gql, variables)
  return reducer(response, preview)
}

/**
 * Handles caching CMS queries with CloudFlare's KV.
 * Requires a `reducer` function used to slim down the CMS response.
 *
 * ```tsx
 * const response = await get({
 *   context,
 *   preview,
 *   gql: GET_FROM_CMS,
 *   key: "unique-identifier",
 *   reducer: response => response.filter(item => item.published)
 * })
 * ```
 */
export async function get<
  Reducer extends (response: any, preview: boolean) => any
>({
  key,
  gql,
  variables,
  context,
  preview,
  reducer,
}: {
  key: string
  gql: string
  variables?: any
  context: Context
  preview: boolean
  reducer: Reducer
}) {
  // Skip cache on CMS preview mode
  if (preview) return getFromCms({ gql, context, reducer, variables, preview })

  // Try to return from KV
  const cache = await context.cmsCache.get<ReturnType<Reducer>>(key, {
    type: "json",
  })

  if (cache !== null) return cache

  // Fetch and store reduced value on KV
  const result = await getFromCms({ gql, context, reducer, variables, preview })
  await context.cmsCache.put(key, JSON.stringify(result))
  return result
}
