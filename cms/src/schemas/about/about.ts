import aboutFirstParagraph from "./aboutFirstParagraph"
import aboutParagraphs from "./aboutParagraphs"

export default {
  name: "about",
  title: "About",
  type: "document",
  fields: [...aboutFirstParagraph, ...aboutParagraphs],
  preview: {
    select: {},
    prepare: () => ({
      title: "About",
    }),
  },
}
