export default [
  {
    group: "theme",
    name: "toys",
    title: "Toys",
    type: "settingsToys",
    options: {
      sortable: false,
    },
  },
  {
    group: "theme",
    name: "colors",
    title: "Theme colors",
    type: "array",
    options: {
      sortable: false,
    },
    of: [
      {
        title: "Color",
        type: "settingsThemeColor",
      },
    ],
  },
  {
    group: "theme",
    name: "typefaces",
    title: "Theme typefaces",
    description: `
      This field must match the property listed below the typeface name 
      in the web project font list. Usually it will be the typeface name 
      in lowercase and with dashes instead of spaces
    `,
    type: "array",
    options: {
      sortable: false,
    },
    of: [
      {
        name: "typeface",
        title: "",
        type: "string",
        validation: (Rule) => [
          Rule.required(),
          Rule.custom((string) => {
            if (!string) return true

            if (string.includes(" ")) {
              return "should not contain spaces"
            }

            // Check for capitalization
            const stringWithoutDashes = string.split("-").join("")

            if (stringWithoutDashes.toLowerCase() !== stringWithoutDashes) {
              return "should not contain upperace characters"
            }

            return true
          }),
        ],
      },
    ],
  },
]
