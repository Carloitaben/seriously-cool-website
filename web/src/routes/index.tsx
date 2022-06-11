import About from "~/components/About"

export default function Route() {
  return (
    <div className="flex h-full px-1">
      <div className="flex-1 overflow-y-auto px-1 py-2">
        <About />
      </div>
      <div className="flex-1 bg-green-500 px-1">
        <section className="rounded-4xl bg-red-500">projects</section>
      </div>
    </div>
  )
}
