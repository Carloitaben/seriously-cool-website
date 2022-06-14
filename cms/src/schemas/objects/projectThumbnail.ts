export default {
  name: "projectThumbnail",
  title: "Thumbnail",
  type: "object",
  validation: (Rule) => Rule.required(),
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
      hidden: ({ parent }) => parent?.kind !== "VIDEO_GIF",
    },
    {
      name: "color",
      title: "Background color",
      description: "A color that matches the video background",
      type: "color",
      validation: (Rule) => Rule.required(),
      options: {
        disableAlpha: true,
      },
    },
  ],
}
