export default {
  name: "mediaVideo",
  title: "Video",
  type: "object",
  fields: [
    {
      name: "mp4",
      title: "MP4 file",
      type: "file",
      validation: (Rule) => Rule.required(),
      options: {
        accept: "video/mp4",
      },
    },
    {
      name: "width",
      title: "Video width",
      type: "number",
      validation: (Rule) => [Rule.required(), Rule.positive(), Rule.integer()],
    },
    {
      name: "height",
      title: "Video height",
      type: "number",
      validation: (Rule) => [Rule.required(), Rule.positive(), Rule.integer()],
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
