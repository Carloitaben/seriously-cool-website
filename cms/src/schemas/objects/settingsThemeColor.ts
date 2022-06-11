export default {
  name: "settingsThemeColor",
  title: "Color",
  type: "object",
  fields: [
    {
      name: "background",
      title: "Background color",
      description: "Used as background color on the homepage",
      type: "color",
      validation: (Rule) => Rule.required(),
      options: {
        disableAlpha: true,
      },
    },
    {
      name: "text",
      title: "Text color",
      description: "Used as text color on the homepage",
      type: "color",
      validation: (Rule) => Rule.required(),
      options: {
        disableAlpha: true,
      },
    },
    {
      name: "card",
      title: "Card text color",
      description: "Used as text color on cards",
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
      text: "text",
      card: "card",
    },
    prepare: ({ background, text, card }) => {
      if (!background || !text || !card) return { title: "" }

      background = background.hex.toUpperCase()
      text = text.hex.toUpperCase()
      card = card.hex.toUpperCase()

      return { title: `${background} + ${text} + ${card}` }
    },
  },
}
