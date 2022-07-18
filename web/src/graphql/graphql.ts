import { gql } from "graphql-request"

export const GET_SETTINGS = gql`
  query GetSettings {
    allSettings {
      _id
      slidingTexts
      slidingTextsError
      errorTexts
      typefaces
      literals {
        key
        value
      }
      catchphrases {
        textRaw
        visibility
      }
      colors {
        background {
          hex
        }
        text {
          hex
        }
        card {
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
      openGraphImage {
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
        ... on ProjectBlockRichText {
          _key
          textRaw
        }
        ... on ProjectBlockMedia {
          _key
          mediaBlockBlocks {
            _key
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
        ... on Media {
          _key
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
      clientRaw
      category
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
        category
      }
    }
  }
`

export const GET_ABOUT = gql`
  query GetAbout {
    allAbout {
      _id
      firstParagraph {
        firstArtistName
        firstArtistHref
        secondArtistName
        secondArtistHref
      }
      paragraphs {
        _key
        paragraphs {
          variantsRaw
        }
      }
    }
  }
`