export default {
  name: "settingsThemeColor",
  title: "Color",
  type: "object",
  fields: [
    {
      name: "background",
      title: "Background",
      description: "Used as background color on the homepage",
      type: "color",
      validation: (Rule) => Rule.required(),
      options: {
        disableAlpha: true,
      },
    },
    {
      name: "accent",
      title: "Accent",
      description: "Used as text color on the homepage",
      type: "color",
      validation: (Rule) => Rule.required(),
      options: {
        disableAlpha: true,
      },
    },
  ],
  preview: {
    select: {
      background: "background",
      accent: "accent",
    },
    prepare: ({ background, accent }) => {
      if (!background || !accent) return { title: "" }

      background = background.hex.toUpperCase()
      accent = accent.hex.toUpperCase()

      return { title: `${background} + ${accent}` }
    },
  },
}