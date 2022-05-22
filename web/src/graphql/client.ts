import { GraphQLClient } from "graphql-request"

const isPreviewMode = !!process.env.SANITY_API_TOKEN

const token = process.env.SANITY_API_TOKEN ?? ""

export const dataset = "production"
export const projectId = "823i2uuw"
export const endpoint = "default"

const cdnHost = "apicdn.sanity.io"
const apiHost = "api.sanity.io"
const host = isPreviewMode ? apiHost : cdnHost

const auth = token && {
  Authorization: `Bearer ${token}`,
}

export const client = new GraphQLClient(
  `https://${projectId}.${host}/v1/graphql/${dataset}/${endpoint}`,
  {
    headers: {
      ...auth,
    },
  }
)

console.log(`https://${projectId}.${host}/v1/graphql/${dataset}/${endpoint}`)