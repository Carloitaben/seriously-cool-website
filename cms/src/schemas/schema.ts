// Dependencies
import createSchema from "part:@sanity/base/schema-creator"
import schemaTypes from "all:part:@sanity/base/schema-type"

// Objects
import aboutFirstParagraphVariant from "./objects/aboutFirstParagraphVariant"
import blockRichText from "./objects/blockRichText"
import media from "./objects/media"
import mediaImage from "./objects/mediaImage"
import mediaVideo from "./objects/mediaVideo"
import projectAward from "./objects/projectAward"
import projectBlockMedia from "./objects/projectBlockMedia"
import projectBlockRichText from "./objects/projectBlockRichText"
import projectRole from "./objects/projectRole"
import projectThumbnail from "./objects/projectThumbnail"
import settingsCatchphrases from "./objects/settingsCatchphrases"
import settingsLiteral from "./objects/settingsLiteral"
import settingsThemeColor from "./objects/settingsThemeColor"
import settingsToys from "./objects/settingsToys"

// Schemas
import about from "./about"
import project from "./project"
import settings from "./settings"

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    // Objects
    aboutFirstParagraphVariant,
    blockRichText,
    media,
    mediaImage,
    mediaVideo,
    projectAward,
    projectBlockMedia,
    projectBlockRichText,
    projectRole,
    projectThumbnail,
    settingsCatchphrases,
    settingsLiteral,
    settingsThemeColor,
    settingsToys,

    // Schemas
    about,
    project,
    settings,
  ]),
})
