export default {
  name: "settingsToys",
  title: "Toys",
  type: "object",
  options: {
    sortable: false,
  },
  fields: [
    {
      name: "TOY_STICKERS",
      title: "Stickers",
      type: "boolean",
      initialValue: true,
      options: {
        layout: "checkbox",
      },
    },
    {
      name: "TOY_2D_PHYSICAL_SHAPES",
      title: "2D physical shapes",
      type: "boolean",
      initialValue: true,
      options: {
        layout: "checkbox",
      },
    },
  ],
}
