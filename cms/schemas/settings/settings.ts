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
      name: "literals",
      title: "Literals",
    },
  ],
  fields: [...settingsThemeColors, ...settingsThemeTypefaces],
  preview: {
    select: {},
    prepare: () => ({
      title: "Settings",
    }),
  },
}
