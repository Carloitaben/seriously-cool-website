import settingsThemeColors from "./settings.theme.colors"
import settingsThemeFonts from "./settings.theme.fonts"

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
  fields: [...settingsThemeColors, ...settingsThemeFonts],
  preview: {
    select: {},
    prepare: () => ({
      title: "Settings",
    }),
  },
}
