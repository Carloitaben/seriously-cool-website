import type { FC } from "react"

import useRootData from "~/hooks/useRootData"

import AboutFirstParagraph from "./AboutFirstParagraph"
import AboutLastParagraph from "./AboutLastParagraph"
import AboutNavbar from "./AboutNavbar"
import AboutParagraphs from "./AboutParagraphs"

type Props = {}

const HomeAbout: FC<Props> = () => {
  const {
    theme: { colors },
  } = useRootData()

  const style = {
    background: colors.text,
    color: colors.card,
  }

  return (
    <aside className="flex-1 overflow-y-auto px-1 pb-24 pt-2">
      <section
        className="rounded-4xl flex-1 px-16 pb-16 text-5xl"
        style={style}
      >
        <AboutNavbar />
        <AboutFirstParagraph />
        <AboutParagraphs />
        <AboutLastParagraph />
      </section>
    </aside>
  )
}

export default HomeAbout
