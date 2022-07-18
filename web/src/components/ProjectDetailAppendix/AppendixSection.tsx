import type { FC, ReactNode } from "react"

type Props = {
  title: string
  children: ReactNode
  className?: string
}

const AppendixSection: FC<Props> = ({ title, className = "", children }) => {
  return (
    <>
      <h4 className="col-span-4 text-5xl">{title}</h4>
      <div className={`col-span-4 ${className}`}>{children}</div>
    </>
  )
}

export default AppendixSection
