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
  if (text[0]?.children?.length) return getFromChildren(text[0].children) || fallback
  return fallback
}

export default [
  {
    group: "appendix",
    name: "client",
    title: "Client",
    type: "blockRichText",
    validation: (Rule) => Rule.required(),
  },
  {
    group: "appendix",
    name: "location",
    title: "Location",
    type: "string",
    validation: (Rule) => Rule.required(),
  },
  {
    group: "appendix",
    name: "year",
    title: "Year",
    type: "year",
  },
  {
    group: "appendix",
    name: "roles",
    title: "Roles",
    type: "array",
    of: [
      {
        name: "role",
        title: "Role",
        type: "object",
        fields: [
          {
            name: "pretitle",
            title: "Role label",
            type: "string",
            description: 'i.e. "Responsible of"',
            validation: (Rule) => Rule.required(),
          },
          {
            name: "title",
            title: "Role name",
            type: "string",
            description: 'i.e. "Web prototyping"',
            validation: (Rule) => Rule.required(),
          },
        ],
        preview: {
          select: {
            pretitle: "pretitle",
            title: "title",
          },
          prepare: ({ pretitle = "Missing pretitle", title = "Missing title" }) => ({
            title: pretitle,
            subtitle: title,
          }),
        },
      },
    ],
  },
  {
    group: "appendix",
    name: "awards",
    title: "Awards, features & recognitions",
    description: "i.e. Laus awards or Behance features",
    type: "array",
    of: [
      {
        name: "award",
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
            type: "year",
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
            subtitle: `Year: ${year}${showBadge ? ". Showing badge on thumbnail" : ""}`,
          }),
        },
      },
    ],
  },
]
