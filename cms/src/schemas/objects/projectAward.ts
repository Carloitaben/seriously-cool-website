import formatRichBlockText from "../../utils/formatRichBlockText"

export default {
  name: "projectAward",
  title: "Award",
  type: "object",
  fields: [
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
    {
      name: "showBadge",
      title: "Show badge on project thumbnail",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      text: "text",
      year: "year",
      showBadge: "showBadge",
    },
    prepare: ({ text, year = "no year", showBadge }) => ({
      title: formatRichBlockText(text),
      subtitle: `Year: ${year}${
        showBadge ? ". Showing badge on thumbnail" : ""
      }`,
    }),
  },
}
