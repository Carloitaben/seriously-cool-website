import S from "@sanity/desk-tool/structure-builder"
import Iframe from "sanity-plugin-iframe-pane"

import resolveProductionUrl from "./resolveProductionUrl"

export const getDefaultDocumentNode = ({ schemaType }) => {
  if (schemaType === "project") {
    return S.document().views([
      S.view.form(),
      // Including the iframe pane, with a function to create the url
      S.view
        .component(Iframe)
        .options({ url: (doc) => resolveProductionUrl(doc, "/projects/") })
        .title("Preview"),
    ])
  }

  return S.document()
}

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Settings")
        .child(S.document().schemaType("settings").documentId("settings")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["settings"].includes(listItem.getId())
      ),
    ])
