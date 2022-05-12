import type { LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import { getClient } from "~/utils/sanity/getClient"

import Navbar from "~/components/Navbar"

export const loader: LoaderFunction = async () => {
  const projects = await getClient().fetch(`*[_type == "project"]`)

  return { projects }
}

export default function Route() {
  const { projects } = useLoaderData()

  return (
    <>
      <Navbar>
        <Link to="/">Close</Link>
      </Navbar>
      <div>
        <h1>Projects</h1>
        <ul>
          <li>{projects.map((project) => project.slug.current)}</li>
        </ul>
      </div>
    </>
  )
}
