import { Link } from "@remix-run/react"

import Navbar from "~/components/Navbar"

export default function Route() {
  return (
    <>
      <Navbar>
        <Link to="/projects">Close</Link>
      </Navbar>
      <div>Project detail</div>
    </>
  )
}
