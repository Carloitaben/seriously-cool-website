export default {
  name: "year",
  title: "Year",
  type: "number",
  validation: (Rule) => [Rule.required(), Rule.integer(), Rule.positive()],
}
