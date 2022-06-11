import type { FC } from "react"

import useRootData from "~/hooks/useRootData"

const AboutLastParagraph: FC = () => {
  const { literals, theme } = useRootData()

  const fontFamily = theme.fontFamily
    .replace(/-/g, " ")
    .replace(/\b\w/g, (word) => word.toUpperCase())

  const backgroundColor = theme.colors.background.toUpperCase()
  const textColor = theme.colors.text.toUpperCase()
  const cardColor = theme.colors.card.toUpperCase()

  return (
    <div className="tablet:max-w-4xl col-span-5 max-w-xl">
      <br />
      <p>
        {`${literals.aboutThemeDataPretitle} ${fontFamily} ${literals.aboutThemeDataIntertitle} ${backgroundColor}, ${textColor} ${literals.and} ${cardColor}`}
      </p>
    </div>
  )
}

export default AboutLastParagraph
