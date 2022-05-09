export default {
  name: "themeColor",
  title: "Theme color",
  type: "document",
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
      background = background.hex.toUpperCase()
      accent = accent.hex.toUpperCase()

      return { title: `${background} + ${accent}` }
    },
  },
}
