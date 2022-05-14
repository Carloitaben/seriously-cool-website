export default {
  name: "settingsLiteral",
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
}
