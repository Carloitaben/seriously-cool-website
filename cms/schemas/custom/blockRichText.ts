export default {
  name: "blockRichText",
  title: "Rich text",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
              },
              {
                name: "alt",
                title: "Alt",
                type: "string",
                description: `
                  Text to show in the bottom of screen when hovering. 
                  Leave it blank to use the linked text by default.
                `,
              },
            ],
          },
        ],
      },
    },
  ],
}
