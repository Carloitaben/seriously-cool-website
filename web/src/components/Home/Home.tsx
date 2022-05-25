import type { FC } from "react"
import { useMemo } from "react"

import useRootData from "~/hooks/useRootData"

import type { Props as LateralTitleProps } from "~/components/LateralTitle"
import LateralTitle from "~/components/LateralTitle"
import { emojiLogo } from "~/components/Svg"

type LabelsMemoType = Record<string, LateralTitleProps["labels"]>

function splitIntoLines(string: string) {
  const words = string.split(" ")
  const half = Math.ceil(words.length / 2)

  const firstLine = words.slice(0, half)
  const secondLine = words.slice(-half)

  return [firstLine.join(" "), secondLine.join(" ")]
}

const Home: FC = () => {
  const { literals } = useRootData()

  const { labelsAbout, labelsProjects } = useMemo<LabelsMemoType>(
    () => ({
      labelsAbout: {
        desktop: splitIntoLines(literals.homepageAboutLinkDesktop),
        tablet: literals.homepageAboutLinkTablet,
      },
      labelsProjects: {
        desktop: splitIntoLines(literals.homepageProjectsLinkDesktop),
        tablet: literals.homepageProjectsLinkTablet,
      },
    }),
    [
      literals.homepageAboutLinkDesktop,
      literals.homepageAboutLinkTablet,
      literals.homepageProjectsLinkDesktop,
      literals.homepageProjectsLinkTablet,
    ]
  )

  return (
    <div className="flex h-full pt-16  pb-12">
      <LateralTitle href="/about" labels={labelsAbout} />
      <div className="flex flex-1 items-center justify-center px-12">
        {emojiLogo}
      </div>
      <LateralTitle href="/projects" labels={labelsProjects} flip />
    </div>
  )
}

export default Home
