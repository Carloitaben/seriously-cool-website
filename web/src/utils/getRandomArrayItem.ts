export function getRandomArrayItem<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
