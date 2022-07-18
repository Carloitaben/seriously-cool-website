import formatRichBlockText from "../../utils/formatRichBlockText"

export default {
  name: "projectAward",
  title: "Award",
  type: "object",
  fields: [
    {
      name: "category",
      title: "Category",
      description: "Awards with the same category will be grouped together",
      type: "string",
    },
    {
      name: "text",
      title: "Name",
      type: "blockRichText",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => [Rule.required(), Rule.integer(), Rule.positive()],
    },
  ],
  preview: {
    select: {
      text: "text",
      year: "year",
    },
    prepare: ({ text, year = "no year", showBadge }) => ({
      title: formatRichBlockText(text),
      subtitle: `Year: ${year}`,
    }),
  },
}
