import formatRichBlockText from "../../utils/formatRichBlockText"

export default {
  name: "aboutParagraph",
  type: "object",
  fields: [
    {
      name: "paragraphs",
      title: "Variants",
      type: "array",
      of: [{ type: "aboutParagraphRichText" }],
      options: {
        sortable: false,
      },
    },
  ],
  preview: {
    select: {
      paragraphs: "paragraphs",
    },
    prepare: ({ paragraphs }) => {
      if (!paragraphs) return

      return {
        title: formatRichBlockText(paragraphs[0]?.variants),
        subtitle: `${paragraphs.length} variant${
          paragraphs.length > 1 ? "s" : ""
        }`,
      }
    },
  },
}
