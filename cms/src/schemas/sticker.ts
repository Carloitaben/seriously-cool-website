export default {
  name: "sticker",
  title: "Sticker",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        metadata: [],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "page",
      title: "page",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "HOME",
      options: {
        layout: "radio",
        list: [
          { title: "Home", value: "HOME" },
          { title: "About", value: "ABOUT" },
        ],
      },
    },
  ],
  preview: {
    select: {
      page: "page",
      image: "image",
    },
    prepare: ({ page, image }) => {
      const title = page.charAt(0) + page.slice(1).toLowerCase()

      return {
        title,
        media: image.asset,
      }
    },
  },
}
