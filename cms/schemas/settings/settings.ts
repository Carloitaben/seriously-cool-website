import settingsThemeColors from "./settings.theme.colors"
import settingsThemeTypefaces from "./settings.theme.typefaces"
import settingsTextsCatchphrases from "./settings.texts.catchphrases"

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
    ...settingsThemeColors,
    ...settingsThemeTypefaces,
    ...settingsTextsCatchphrases,
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: "Settings",
    }),
  },
}
