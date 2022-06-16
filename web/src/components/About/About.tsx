import type { FC } from "react"
import useRootData from "~/hooks/useRootData"

import AboutFirstParagraph from "./AboutFirstParagraph"
import AboutLastParagraph from "./AboutLastParagraph"
import AboutNavbar from "./AboutNavbar"
import AboutParagraphs from "./AboutParagraphs"

type Props = {}

const About: FC<Props> = () => {
  const {
    theme: { colors },
  } = useRootData()

  const style = {
    background: colors.text,
    color: colors.card,
  }

  return (
    <div className="desktop:fixed desktop:top-0 desktop:left-0 desktop:h-screen desktop:w-1/2 desktop:overflow-y-auto desktop:overscroll-contain desktop:pr-1 desktop:pl-2 desktop:pb-24 desktop:pt-2">
      <section
        className="rounded-4xl desktop:px-16 desktop:pb-16 desktop:text-5xl flex-1 px-10 pb-10 text-2xl"
        style={style}
      >
        <AboutNavbar />
        <AboutFirstParagraph />
        <AboutParagraphs />
        <AboutLastParagraph />
      </section>
    </div>
  )
}

export default About
