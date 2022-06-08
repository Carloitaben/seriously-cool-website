export default [
  {
    name: "firstParagraphPretitle",
    title: "First paragraph pretitle",
    type: "string",
    validation: (Rule) => Rule.required(),
  },
  {
    name: "firstParagraph",
    title: "First paragraph variants",
    type: "array",
    of: [{ type: "aboutFirstParagraphVariant" }],
  },
  {
    name: "firstParagraphPosttitle",
    title: "First paragraph posttitle",
    type: "string",
    validation: (Rule) => Rule.required(),
  },
]
