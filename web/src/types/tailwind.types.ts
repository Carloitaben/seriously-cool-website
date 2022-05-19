import type tailwindConfig from "../../tailwind.config"

export type TailwindConfig = typeof tailwindConfig

export type TailwindScreens = TailwindConfig["theme"]["screens"]

export type tailwindScreen = keyof TailwindScreens
