import type { RefObject } from "react"
import { useEffect, useState } from "react"

export default function useGroupProjectsAnimations({
  ref,
  projects,
}: {
  ref: RefObject<HTMLElement>
  projects: any[]
}) {
  const [animationGroups, setAnimationGroups] = useState<number[][]>([])
  const [loadedProjects, setLoadedProjects] = useState<number[]>([])
  const [animateProjects, setAnimateProjects] = useState<number[]>([])

  useEffect(() => {
    if (!ref.current || !projects.length) return

    const children = Array.from(ref.current.children)

    const groupsByPosition = children.reduce<Record<string, number[]>>(
      (accumulator, child, index) => {
        const { y } = child.getBoundingClientRect()

        if (y in accumulator) {
          accumulator[y].push(index)
        } else {
          accumulator[y] = [index]
        }

        return accumulator
      },
      {}
    )

    setAnimationGroups(Object.values(groupsByPosition))
  }, [projects, ref])

  useEffect(() => {
    animationGroups?.forEach((group) => {
      const projectFromGroupNotLoaded = group.find(
        (project) => !loadedProjects.includes(project)
      )

      if (projectFromGroupNotLoaded) return

      setAnimateProjects((current) => {
        group.forEach((item) => {
          if (current.includes(item)) return
          current.push(item)
        })

        return [...current]
      })
    })
  }, [animationGroups, loadedProjects])

  function onProjectLoad(index: number) {
    setLoadedProjects((current) => {
      if (current.includes(index)) return current
      current.push(index)
      return [...current]
    })
  }

  return {
    animateProjects,
    onProjectLoad,
  }
}
