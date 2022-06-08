import aboutFirstParagraph from "./aboutFirstParagraph"

export default {
  name: "about",
  title: "About",
  type: "document",
  fields: [...aboutFirstParagraph],
  preview: {
    select: {},
    prepare: () => ({
      title: "About",
    }),
  },
}
