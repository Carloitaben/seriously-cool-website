import type { FC } from "react"

import AboutFirstParagraph from "./AboutFirstParagraph"
import AboutLastParagraph from "./AboutLastParagraph"
import AboutParagraphs from "./AboutParagraphs"

type Props = {}

const About: FC<Props> = () => {
  return (
    <section className="bg-text text-card rounded-4xl flex-1 px-16 text-5xl">
      <AboutFirstParagraph />
      <AboutParagraphs />
      <AboutLastParagraph />
    </section>
  )
}

export default About
