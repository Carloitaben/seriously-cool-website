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
    type: "projectThumbnail",
  },
  {
    group: "about",
    name: "openGraphImage",
    title: "Open Graph Image",
    description: "Will be used when the project is shared on social media",
    type: "image",
    options: {
      metadata: [],
    },
    validation: (Rule) => Rule.required(),
  },
]
