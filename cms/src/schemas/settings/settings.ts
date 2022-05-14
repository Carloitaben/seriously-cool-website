import settingsLiterals from "./settingsLiterals"
import settingsTexts from "./settingsTexts"
import settingsTheme from "./settingsTheme"

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
  fields: [...settingsLiterals, ...settingsTexts, ...settingsTheme],
  preview: {
    select: {},
    prepare: () => ({
      title: "Settings",
    }),
  },
}
