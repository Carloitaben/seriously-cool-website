import type { FC } from "react"

import TextBlock from "~/components/TextBlock"
import useRootData from "~/hooks/useRootData"

const AboutParagraphs: FC = () => {
  const {
    about: { paragraphs },
  } = useRootData()

  return (
    <>
      {paragraphs.map((paragraph) => (
        <div
          key={paragraph._key}
          className="tablet:max-w-4xl col-span-5 max-w-xl"
        >
          <br />
          <TextBlock>{paragraph.content}</TextBlock>
        </div>
      ))}
    </>
  )
}

export default AboutParagraphs
