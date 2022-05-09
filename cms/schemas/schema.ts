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
import sticker from "./sticker"
import settings from "./settings"
import themeCatchPhrase from "./theme.catchPhrase"
import themeFont from "./theme.font"
import themeSlidingText from "./theme.slidingText"

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
    sticker,
    themeCatchPhrase,
    themeFont,
    themeSlidingText,
    settings,
  ]),
})
