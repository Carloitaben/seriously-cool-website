import type { FC } from "react"
import { Fragment } from "react"

import type { ProjectDetailLoaderData } from "~/routes/projects/$slug"
import type { ProjectAward, StripGQLProps } from "~/types"
import useRootData from "~/hooks/useRootData"
import TextBlock from "~/components/TextBlock"

import AppendixSection from "./AppendixSection"

type Props = {
  project: ProjectDetailLoaderData["project"]
}

type AwardGroup = StripGQLProps<ProjectAward>[]

const AppendixAwards: FC<Props> = ({ project }) => {
  const { literals } = useRootData()

  const groupedAwards =
    project.awards.length > 0 &&
    project.awards.reduce<Record<string, AwardGroup>>((accumulator, award) => {
      if (award.category in accumulator) {
        accumulator[award.category].push(award)
      } else {
        accumulator[award.category] = [award]
      }

      return accumulator
    }, {})

  if (!groupedAwards) return null

  return (
    <AppendixSection title={literals.awards}>
      {Object.entries(groupedAwards).map(
        ([group, awards], groupIndex, self) => (
          <Fragment key={group}>
            <div>
              {group !== "null" && <h5 className="uppercase">{group}</h5>}
              {awards.map((award, awardIndex) => (
                <h6
                  className="inline-flex w-full justify-between"
                  key={awardIndex}
                >
                  <TextBlock>{award.textRaw}</TextBlock>
                  <span>{award.year}</span>
                </h6>
              ))}
            </div>
            {groupIndex + 1 !== self.length && <br />}
          </Fragment>
        )
      )}
    </AppendixSection>
  )
}

export default AppendixAwards
