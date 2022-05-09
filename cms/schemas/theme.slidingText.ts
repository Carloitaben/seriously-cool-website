export default {
  name: "slidingText",
  title: "Sliding text",
  type: "document",
  fields: [
    {
      description:
        "Decide in which page will be rendered. Pages with this ID will try to get their corresponding texts and will fall back to the default.",
      name: "page",
      title: "Page",
      type: "string",
      readOnly: ({ currentUser }) => {
        return !currentUser.roles.find(({ name }) => name === "administrator")
      },
    },
    {
      description:
        "Text should be written in normal case. The website handles the uppercase transformation automatically",
      name: "slidingText",
      title: "Texts",
      type: "array",
      validation: (Rule) => [Rule.required(), Rule.min(1)],
      of: [
        {
          name: "text",
          type: "string",
        },
      ],
    },
  ],
}
