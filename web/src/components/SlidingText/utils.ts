/**
 * Having a fixed animation duration will cause long texts
 * to seem to move slower. Using this function we can correct that.
 */
export function getDuration(text: string[]) {
  const characters = text.join(" ").length
  return (characters * 30) / 100 // 100 characters = 30s
}

/**
 * If a screen is wide enough, it could fit all sliding text
 * and break the animation. Instead of creating more DOM nodes,
 * we can simply use a displaced text shadow to fill the space.
 */
export function getTextShadow(width: number) {
  let shadows: string[] = []

  for (let index = 1; (index - 1) * width < window.innerWidth + 1; index++) {
    shadows.push(`${width * index}px 0 currentColor`)
  }

  return shadows.join(", ")
}
