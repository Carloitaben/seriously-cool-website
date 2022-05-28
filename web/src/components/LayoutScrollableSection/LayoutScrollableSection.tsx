import type { FC, JSXElementConstructor, ReactElement, RefObject } from "react"
import { useContext, createContext, cloneElement, useRef } from "react"

type Props = {
  children: ReactElement<any, string | JSXElementConstructor<any>>
}

export type LayoutScrollableSectionContext = {
  scrollableRef: RefObject<HTMLElement>
}

export const layoutScrollableSectionContext =
  createContext<LayoutScrollableSectionContext>(null!)

export function useLayoutScrollableSectionContext() {
  return useContext(layoutScrollableSectionContext)
}

const LayoutScrollableSection: FC<Props> = ({ children }) => {
  const ref = useRef<HTMLElement>(null)

  return (
    <layoutScrollableSectionContext.Provider value={{ scrollableRef: ref }}>
      {cloneElement(children, {
        ref,
      })}
    </layoutScrollableSectionContext.Provider>
  )
}

export default LayoutScrollableSection
