export default {
  name: "mediaImage",
  title: "Image",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image file",
      type: "image",
      options: {
        metadata: [],
      },
    },
    {
      description:
        "An optional description. Used with assistive technologies and as SEO information.",
      name: "alt",
      title: "Alternative text",
      type: "string",
    },
  ],
}
