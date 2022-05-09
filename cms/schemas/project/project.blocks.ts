export default [
  {
    group: "blocks",
    name: "blocks",
    title: "Blocks",
    type: "array",
    of: [
      {
        name: "richTextBlock",
        title: "Text block",
        type: "object",
        fields: [
          {
            name: "text",
            title: "Text",
            type: "blockRichText",
            validation: (Rule) => Rule.required(),
          },
        ],
        preview: {
          select: {
            text: "text",
          },
          prepare: ({ text }) => {
            const title = text
              ? text.map((block) => block.children.map(({ text = "" }) => text).join(" ")).join(" ")
              : "No text"

            return {
              title,
            }
          },
        },
      },
      {
        name: "mediaBlock",
        title: "Media block",
        type: "object",
        fields: [
          {
            description:
              "Adding a single item will render it at the right side of the grid. Adding two will render each as half the grid. Adding three or more will render them in a carousel.",
            name: "mediaBlockBlocks",
            title: "Blocks",
            type: "array",
            of: [
              {
                name: "mediaBlockBlock",
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
      },
      {
        name: "mediaBlockFullWidth",
        title: "Media block (full width)",
        type: "media",
      },
    ],
  },
]
