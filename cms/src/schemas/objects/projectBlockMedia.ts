export default {
  name: "projectBlockMedia",
  title: "Media block",
  type: "object",
  fields: [
    {
      description: `
        Adding a single item will render it at the right side of the grid. 
        Adding two will render each as half the grid. 
        Adding three or more will render them in a carousel.
      `,
      name: "mediaBlockBlocks",
      title: "Blocks",
      type: "array",
      of: [
        {
          title: "Media block",
          type: "media",
        },
      ],
      validation: (Rule) => [Rule.required(), Rule.min(1)],
    },
  ],
  preview: {
    select: {
      mediaBlockBlocks: "mediaBlockBlocks",
    },
    prepare: ({ mediaBlockBlocks }) => ({
      title: "Media block",
    }),
  },
}
