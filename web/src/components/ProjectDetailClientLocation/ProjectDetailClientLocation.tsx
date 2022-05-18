import type { FC } from "react"
import type { Scalars } from "~/types/sanity"
import TextBlock from "../TextBlock"

type Props = {
  client: Scalars["JSON"]
  location: string
  year: number
}

const ProjectDetailClientLocation: FC<Props> = ({ client, location, year }) => {
  return (
    <div className="flex col-span-6">
      <div className="flex flex-1">
        <TextBlock>{client}</TextBlock>, {location}
      </div>
      <div>{year}</div>
    </div>
  )
}

export default ProjectDetailClientLocation
