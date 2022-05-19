import { gql } from "graphql-request"

export const GET_SETTINGS = gql`
  query GetSettings {
    allSettings {
      _id
      slidingTexts
      typefaces
      toys {
        TOY_STICKERS
        TOY_2D_PHYSICAL_SHAPES
      }
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
      _id
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

export const GET_PROJECT = gql`
  query GetProject($slug: String!) {
    allProject(where: { slug: { current: { eq: $slug } } }) {
      _id
      title
      descriptionRaw
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
      blocks {
        __typename
      }
      clientRaw
      location
      year
      roles {
        _key
        pretitle
        title
      }
      awards {
        _key
        textRaw
        year
      }
    }
  }
`