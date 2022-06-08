export default {
  name: "aboutFirstParagraphVariant",
  type: "object",
  fields: [
    {
      name: "firstArtistName",
      title: "First artist name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "firstArtistHref",
      title: "First artist URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "secondArtistName",
      title: "Second artist name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "secondArtistHref",
      title: "Second artist URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      firstArtistName: "firstArtistName",
      secondArtistName: "secondArtistName",
    },
    prepare: ({ firstArtistName = "", secondArtistName = "" }) => ({
      title: `${firstArtistName} ${
        secondArtistName && `& ${secondArtistName}`
      }`,
    }),
  },
}
