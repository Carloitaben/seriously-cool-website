/**
 * On preview mode or in development environment,
 * prefer drafts over published content
 */
export function filterSanityDocumentDrafts<T extends { _id: string }>(
  documents: T[],
  preview: boolean
) {
  if (!preview) return documents

  return documents.reduce<T[]>((accumulator, document) => {
    if (document._id.startsWith("drafts.")) {
      const index = accumulator.findIndex(
        (item) => `drafts.${item._id}` === document._id
      )

      if (index > -1) accumulator.splice(index, 1)
    }

    accumulator.push(document)

    return accumulator
  }, [])
}
