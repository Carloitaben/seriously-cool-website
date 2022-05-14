export default [
  {
    group: "blocks",
    name: "blocks",
    title: "Blocks",
    type: "array",
    of: [
      {
        title: "Text block",
        type: "projectBlockRichText",
      },
      {
        title: "Media block",
        type: "projectBlockMedia",
      },
      {
        title: "Media block (full width)",
        type: "media",
      },
    ],
  },
]
