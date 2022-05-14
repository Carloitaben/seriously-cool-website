export default {
  name: "projectBlockRichText",
  title: "Text block",
  type: "object",
  fields: [
    {
      name: "text",
      title: "Text",
      type: "blockRichText",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      text: "text",
    },
    prepare: ({ text }) => {
      const title = text
        ? text
            .map((b) => b.children.map(({ text = "" }) => text).join(" "))
            .join(" ")
        : "No text"

      return {
        title,
      }
    },
  },
}
