import formatRichBlockText from "../../utils/formatRichBlockText"

export default {
  name: "aboutParagraphRichText",
  type: "object",
  fields: [
    {
      name: "variants",
      title: "Variant",
      type: "blockRichText",
    },
  ],
  preview: {
    select: {
      variants: "variants",
    },
    prepare: ({ variants }) => ({
      title: formatRichBlockText(variants),
    }),
  },
}
