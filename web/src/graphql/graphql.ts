import { gql } from "graphql-request"

export const GET_SETTINGS = gql`
  query GetSettings($id: ID!) {
    Settings(id: $id) {
      slidingTexts
      typefaces
      catchphrases {
        textRaw
        visibility
      }
      colors {
        background {
          hex
        }
        accent {
          hex
        }
      }
    }
  }
`

export const GET_PROJECTS = gql`
  query GetProjects {
    allProject {
      slug {
        current
      }
      title
      awards {
        showBadge
      }
      thumbnail {
        kind
        video {
          mp4 {
            asset {
              url
            }
          }
          width
          height
          alt
        }
        image {
          image {
            asset {
              metadata {
                dimensions {
                  height
                  width
                }
              }
              url
            }
          }
          alt
        }
      }
    }
  }
`
