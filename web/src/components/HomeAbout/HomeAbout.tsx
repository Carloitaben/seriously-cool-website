import type { FC } from "react"

import AboutFirstParagraph from "./AboutFirstParagraph"
import AboutLastParagraph from "./AboutLastParagraph"
import AboutNavbar from "./AboutNavbar"
import AboutParagraphs from "./AboutParagraphs"

type Props = {}

const HomeAbout: FC<Props> = () => {
  return (
    <section className="flex-1 overflow-y-auto px-1 py-2">
      <div className="bg-text text-card rounded-4xl flex-1 px-16 text-5xl">
        <AboutNavbar />
        <AboutFirstParagraph />
        <AboutParagraphs />
        <AboutLastParagraph />
      </div>
    </section>
  )
}

export default HomeAbout
