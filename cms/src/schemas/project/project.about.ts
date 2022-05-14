export default [
  {
    group: "about",
    name: "title",
    title: "Title",
    type: "string",
    validation: (Rule) => Rule.required(),
  },
  {
    group: "about",
    name: "slug",
    title: "Slug",
    type: "slug",
    validation: (Rule) => Rule.required(),
    options: {
      source: "title",
      maxLength: 96,
    },
  },
  {
    group: "about",
    name: "description",
    title: "Description",
    type: "blockRichText",
    validation: (Rule) => Rule.required(),
  },
  {
    group: "about",
    name: "thumbnail",
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
    ],
  },
]
