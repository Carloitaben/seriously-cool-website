function getFromChildren(children) {
  return children.reduce((accumulator, child) => {
    if (child._type === "span") {
      accumulator += child.text
    } else if (child._type === "block" && child?.children?.length) {
      accumulator += getFromChildren(child.children)
    }

    return accumulator
  }, "")
}

function formatTitle(text, fallback = "No text") {
  if (text[0]?.children?.length)
    return getFromChildren(text[0].children) || fallback
  return fallback
}

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
      title: formatTitle(text, "No text"),
      subtitle: `Year: ${year}${
        showBadge ? ". Showing badge on thumbnail" : ""
      }`,
    }),
  },
}
