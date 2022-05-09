export default {
  name: "themeFont",
  title: "Theme font",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Adobe Fonts typeface",
      description:
        "This field must match the property listed below the typeface name in the web project font list (https://fonts.adobe.com/my_fonts#web_projects-section). Usually it will be the typeface name in lowercase and with dashes instead of spaces)",
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
  preview: {
    select: {
      name: "name",
    },
    prepare: ({ name }) => {
      const title = name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      return { title }
    },
  },
}
