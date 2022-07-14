import { GraphQLClient } from "graphql-request"

import type { Context } from "~/types"

export const dataset = "production"
export const projectId = "823i2uuw"
export const endpoint = "default"

const cdnHost = "apicdn.sanity.io"
const apiHost = "api.sanity.io"

let client: GraphQLClient | null = null
let clientEnv: "api" | "cdn" | null = null

export function getClient(context: Context) {
  if (context.SANITY_API_TOKEN) {
    if (clientEnv === "api" && !!client) return client
    clientEnv = "api"
    client = new GraphQLClient(
      `https://${projectId}.${apiHost}/v1/graphql/${dataset}/${endpoint}`,
      {
        fetch: fetch,
        headers: {
          Authorization: `Bearer ${context.SANITY_API_TOKEN}`,
        },
      }
    )
  } else {
    if (clientEnv === "cdn" && !!client) return client
    clientEnv = "cdn"
    client = new GraphQLClient(
      `https://${projectId}.${cdnHost}/v1/graphql/${dataset}/${endpoint}`
    )
  }

  return client
}
