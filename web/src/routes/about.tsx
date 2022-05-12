import { Link } from "@remix-run/react"

import Navbar from "~/components/Navbar"

export default function Route() {
  return (
    <>
      <Navbar>
        <Link to="/">Close</Link>
      </Navbar>
      <div className="px-container">About</div>
    </>
  )
}
