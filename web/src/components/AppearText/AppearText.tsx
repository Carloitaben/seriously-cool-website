import type { FC } from "react"

type Props = {
  children: string
  /**
   * Programatically control the animation
   */
  animate?: boolean
  onAnimationStart?: () => void
  onAnimationEnd?: () => void
}

const DELAY = 0
const DELAY_WEIGHT = 30

const AppearText: FC<Props> = ({
  children,
  animate = true,
  onAnimationStart,
  onAnimationEnd,
}) => {
  function handleAnimationStart(index: number, length: number) {
    if (index + 1 === length && onAnimationStart) {
      onAnimationStart()
    }
  }

  function handleAnimationEnd(index: number, length: number) {
    if (index + 1 === length && onAnimationEnd) {
      onAnimationEnd()
    }
  }

  return (
    <>
      {children.split(" ").map((word, index, self) => {
        const previousWordLength =
          index === 0 ? 0 : [...self].splice(0, index).join("").length

        const wordDelay =
          index === 0 ? DELAY : (previousWordLength + DELAY) * DELAY_WEIGHT

        return (
          <span key={index} className="inline-flex">
            <span
              className="inline-flex"
              onAnimationStart={() => handleAnimationStart(index, self.length)}
              onAnimationEnd={() => handleAnimationEnd(index, self.length)}
              style={{
                animation: `appear-animation 1s cubic-bezier(1, 0, 0, 1) ${wordDelay}ms both ${
                  animate ? "running" : "paused"
                }`,
              }}
            >
              {word}&nbsp;
            </span>
          </span>
        )
      })}
    </>
  )
}

export default AppearText
