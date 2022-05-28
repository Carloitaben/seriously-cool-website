import type { FC } from "react"
import type { Scalars } from "~/types"
import TextBlock from "~/components/TextBlock"

type Props = {
  client: Scalars["JSON"]
  location: string
  year: number
}

const ProjectDetailClientLocation: FC<Props> = ({ client, location, year }) => {
  return (
    <div className="col-span-6 flex">
      <div className="flex flex-1">
        <TextBlock>{client}</TextBlock>, {location}
      </div>
      <div>{year}</div>
    </div>
  )
}

export default ProjectDetailClientLocation
