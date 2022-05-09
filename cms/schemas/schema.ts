// Dependencies
import createSchema from "part:@sanity/base/schema-creator"
import schemaTypes from "all:part:@sanity/base/schema-type"

// Custom types
import blockRichText from "./custom/blockRichText"
import media from "./custom/media"
import mediaImage from "./custom/mediaImage"
import mediaVideo from "./custom/mediaVideo"
import year from "./custom/year"

// Schemas
import project from "./project"
import settings from "./settings"
import sticker from "./sticker"

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    // Types
    blockRichText,
    media,
    mediaImage,
    mediaVideo,
    year,

    // Schemas
    project,
    settings,
    sticker,
  ]),
})
