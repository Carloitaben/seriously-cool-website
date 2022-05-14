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
    type: "number",
    validation: (Rule) => [Rule.required(), Rule.integer(), Rule.positive()],
  },
  {
    group: "appendix",
    name: "roles",
    title: "Roles",
    type: "array",
    of: [
      {
        title: "Role",
        type: "projectRole",
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
        title: "Award",
        type: "projectAward",
      },
    ],
  },
]
