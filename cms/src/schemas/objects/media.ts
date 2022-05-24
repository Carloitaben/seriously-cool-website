export default {
  name: "media",
  title: "Media",
  type: "object",
  fields: [
    {
      name: "kind",
      title: "Kind",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        layout: "radio",
        list: [
          {
            title: "Image",
            value: "IMAGE",
          },
          {
            title: "Video (as a GIF)",
            value: "VIDEO_GIF",
          },
          {
            title: "Video (with controls)",
            value: "VIDEO_PLAYER",
          },
        ],
      },
    },
    {
      name: "image",
      title: "Image",
      type: "mediaImage",
      hidden: ({ parent }) => parent?.kind !== "IMAGE",
    },
    {
      name: "video",
      title: "Video",
      type: "mediaVideo",
      hidden: ({ parent }) =>
        !["VIDEO_GIF", "VIDEO_PLAYER"].includes(parent?.kind),
    },
  ],
}
