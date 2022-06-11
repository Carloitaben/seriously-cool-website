import HomeAbout from "~/components/HomeAbout"
import HomeProjects from "~/components/HomeProjects"

export default function Route() {
  return (
    <div className="flex h-full px-1">
      <div className="flex-1 overflow-y-auto px-1 py-2">
        <HomeAbout />
      </div>
      <div className="flex-1 overflow-y-auto px-1 py-2">
        <HomeProjects />
      </div>
    </div>
  )
}
