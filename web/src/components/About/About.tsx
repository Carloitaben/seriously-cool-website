import type { FC } from "react"
import useRootData from "~/hooks/useRootData"

import Appear from "~/components/Appear"
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
    <div className="desktop:fixed desktop:top-0 desktop:left-0 desktop:h-screen desktop:w-1/2 homeMaxWidth:w-[60rem] desktop:overflow-y-auto desktop:overscroll-contain desktop:pr-1 desktop:pl-2 desktop:pb-24 desktop:pt-2 selection:bg-card selection:text-text">
      <Appear>
        <section
          className="rounded-4xl desktop:px-16 desktop:pb-16 desktop:text-5xl flex-1 px-10 pb-10"
          style={style}
        >
          <AboutNavbar />
          <AboutFirstParagraph />
          <AboutParagraphs />
          <AboutLastParagraph />
        </section>
      </Appear>
    </div>
  )
}

export default About
