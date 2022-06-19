export default [
  {
    group: "texts",
    name: "catchphrases",
    title: "Catchphrases",
    type: "array",
    options: {
      sortable: false,
    },
    of: [{ type: "settingsCatchphrase" }],
  },
  {
    group: "texts",
    name: "slidingTexts",
    title: "Sliding texts (all pages)",
    description: `
      These are the texts that appear sliding on loop at the bottom of the page.
      They are transformed to uppercase automatically on the website, 
      so it's better to write them them normal-case.
    `,
    type: "array",
    of: [
      {
        name: "text",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
    ],
  },
  {
    group: "texts",
    name: "errorTexts",
    title: "Error page texts",
    description:
      "The website will pick one randomly to show at the error page.",
    type: "array",
    of: [
      {
        name: "text",
        title: "",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
    ],
  },
  {
    group: "texts",
    name: "slidingTextsError",
    title: "Sliding texts (error page)",
    description: "These ones will only appear on the error page.",
    type: "array",
    of: [
      {
        name: "text",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
    ],
  },
]
