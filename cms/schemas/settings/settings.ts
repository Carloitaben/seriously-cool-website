import settingsThemeColors from "./settings.theme.colors"

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
  fields: [...settingsThemeColors],
  preview: {
    select: {},
    prepare: () => ({
      title: "Settings",
    }),
  },
}
