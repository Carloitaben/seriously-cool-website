import type { FC } from "react"

import useRootData from "~/hooks/useRootData"

import Link from "~/components/Link"

const AboutFirstParagraph: FC = () => {
  const {
    literals,
    about: {
      firstParagraph: {
        firstArtistHref,
        firstArtistName,
        secondArtistHref,
        secondArtistName,
      },
    },
  } = useRootData()

  return (
    <div className="tablet:max-w-4xl col-span-5 max-w-xl">
      <p>
        {literals.aboutFirstParagraphPretitle}{" "}
        <Link href={firstArtistHref}>{firstArtistName}</Link>{" "}
        {literals.aboutFirstParagraphIntertitle}{" "}
        <Link href={secondArtistHref}>{secondArtistName}</Link>
        {". "}
        {literals.aboutFirstParagraphPosttitle}
      </p>
    </div>
  )
}

export default AboutFirstParagraph
