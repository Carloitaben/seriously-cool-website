export default [
  {
    group: "literals",
    name: "literals",
    title: "Literals",
    description:
      "These are the texts that populate all the website: buttons, labels, etc.",
    type: "array",
    of: [
      {
        name: "literal",
        type: "object",
        fields: [
          {
            name: "key",
            title: "Key",
            type: "string",
            description: "Use camelCase please 🙏",
            validation: (Rule) => [
              Rule.required(),
              Rule.custom((string) => {
                if (!string) return true

                if (string.includes(" ")) {
                  return "should not contain spaces"
                }

                return true
              }),
            ],
          },
          {
            name: "value",
            title: "Value",
            type: "string",
            validation: (Rule) => Rule.required(),
          },
        ],
        preview: {
          select: {
            key: "key",
            value: "value",
          },
          prepare: ({ key = "", value = "" }) => ({
            title: value,
            subtitle: key,
          }),
        },
      },
    ],
  },
]
