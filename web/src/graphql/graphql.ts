import { gql } from "graphql-request"

export const GET_SETTINGS = gql`
  query GetSettings {
    allSettings {
      _id
      slidingTexts
      typefaces
      literals {
        key
        value
      }
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
      awards {
        showBadge
      }
      thumbnail {
        kind
        color {
          hex
        }
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
        color {
          hex
        }
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