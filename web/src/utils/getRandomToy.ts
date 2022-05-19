import type { Toy, ToyObject } from "~/types"
import { getRandomArrayItem } from "./getRandomArrayItem"

export function getRandomToy(toys: ToyObject) {
  const activeToys = Object.entries(toys).reduce<Toy[]>(
    (accumulator, [key, value]) => {
      if (value) accumulator.push(key as Toy)
      return accumulator
    },
    []
  )

  return getRandomArrayItem(activeToys)
}
