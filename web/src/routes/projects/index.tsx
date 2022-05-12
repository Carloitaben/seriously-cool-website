import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { getClient } from "~/utils/sanity/getClient"

export const loader: LoaderFunction = async () => {
  const projects = await getClient().fetch(`*[_type == "project"]`)

  return { projects }
}

export default function Route() {
  const { projects } = useLoaderData()

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        <li>{projects.map((project) => project.slug.current)}</li>
      </ul>
    </div>
  )
}
