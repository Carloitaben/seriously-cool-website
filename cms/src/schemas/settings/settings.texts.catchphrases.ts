export default [
  {
    group: "texts",
    name: "catchphrases",
    title: "Catchphrases",
    type: "array",
    options: {
      sortable: false,
    },
    of: [
      {
        name: "catchphrase",
        title: "Catchphrase",
        type: "object",
        fields: [
          {
            name: "text",
            title: "Text",
            type: "blockRichText",
          },
          {
            name: "visibility",
            title: "Visibility",
            type: "string",
            validation: (Rule) => Rule.required(),
            initialValue: "BOTH",
            options: {
              layout: "radio",
              list: [
                { title: "Desktop and mobile", value: "BOTH" },
                { title: "Desktop only", value: "DESKTOP" },
                { title: "Mobile only", value: "MOBILE" },
              ],
            },
          },
        ],
        preview: {
          select: {
            text: "text",
            visibility: "visibility",
          },
          prepare: ({ text, visibility }) => {
            if (!text?.length) return { title: "" }

            const child = text[0].children

            if (!child?.length) return { title: "" }

            let title = ""

            child.map((c) => (title += ` ${c?.text}`))

            const subtitle =
              visibility.charAt(0) + visibility.slice(1).toLowerCase()

            return {
              title,
              subtitle,
            }
          },
        },
      },
    ],
  },
]
