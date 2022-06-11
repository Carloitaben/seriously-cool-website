import HomeAbout from "~/components/HomeAbout"
import HomeProjects from "~/components/HomeProjects"

export default function Route() {
  return (
    <div className="flex h-full overflow-hidden px-1">
      <HomeAbout />
      <HomeProjects />
    </div>
  )
}
