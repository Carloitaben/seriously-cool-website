import projectAbout from "./project.about"
import projectBlocks from "./project.blocks"
import projectAppendix from "./project.appendix"

export default {
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    {
      name: "about",
      title: "Basic info",
      default: true,
    },
    {
      name: "blocks",
      title: "Blocks",
    },
    {
      name: "appendix",
      title: "Appendix",
    },
  ],
  fields: [...projectAbout, ...projectBlocks, ...projectAppendix],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
}
