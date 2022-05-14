import settingsLiterals from "./settings.literals"
import settingsTextsCatchphrases from "./settings.texts.catchphrases"
import settingsTextsSlidingTexts from "./settings.texts.slidingTexts"
import settingsThemeColors from "./settings.theme.colors"
import settingsThemeTypefaces from "./settings.theme.typefaces"

export default {
  // __experimental_actions: ["update", "publish"],
  name: "settings",
  title: "Settings",
  type: "document",
  groups: [
    {
      name: "theme",
      title: "Theme",
      default: true,
    },
    {
      name: "pages",
      title: "Pages",
    },
    {
      name: "texts",
      title: "Texts",
    },
    {
      name: "literals",
      title: "Literals",
    },
  ],
  fields: [
    ...settingsLiterals,
    ...settingsTextsCatchphrases,
    ...settingsTextsSlidingTexts,
    ...settingsThemeColors,
    ...settingsThemeTypefaces,
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: "Settings",
    }),
  },
}
