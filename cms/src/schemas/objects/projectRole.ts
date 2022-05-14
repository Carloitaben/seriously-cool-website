export default {
  name: "projectRole",
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
}
