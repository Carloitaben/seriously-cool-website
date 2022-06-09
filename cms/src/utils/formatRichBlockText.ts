function getFromChildren(children) {
  return children.reduce((accumulator, child) => {
    if (child._type === "span") {
      accumulator += child.text
    } else if (child._type === "block" && child?.children?.length) {
      accumulator += getFromChildren(child.children)
    }

    return accumulator
  }, "")
}

export default function formatRichBlockText(
  text: Record<string, any>,
  fallback = "No text"
) {
  if (text[0]?.children?.length)
    return getFromChildren(text[0].children) || fallback
  return fallback
}
