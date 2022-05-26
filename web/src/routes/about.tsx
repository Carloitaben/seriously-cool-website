import { Link } from "@remix-run/react"

import useRootData from "~/hooks/useRootData"

import Navbar from "~/components/Navbar"

export default function Route() {
  const { literals } = useRootData()

  return (
    <>
      <Navbar goBackRoute="/">
        <Link to="/" className="menuContentVisible:inline-block hidden">
          {literals.close}
        </Link>
        <span className="menuContentVisible:hidden">
          {literals.navLinkAboutLabel}
        </span>
      </Navbar>
      <div className="px-container">About</div>
    </>
  )
}
