import type { FC, RefObject } from "react"
import { motion } from "framer-motion"

import SliderPicker from "~/components/SliderPicker"
import { play, pause } from "~/components/Svg"

type Props = {
  video: RefObject<HTMLVideoElement>
}

const VideoControls: FC<Props> = ({ video }) => {
  return (
    <motion.div
      layout
      className="relative -mt-60 flex h-60 flex-col justify-end bg-gradient-to-b from-transparent to-black/25 px-8 pb-4 text-white"
    >
      <SliderPicker className="mb-1" />
      <div className="flex w-full items-center">
        <div className="space-between flex w-full items-center">
          <button className="-ml-2 mr-1 flex h-12 w-12 items-center justify-center">
            {video.current?.paused ? play : pause}
          </button>
          <SliderPicker className="w-32" />
        </div>
        <motion.span layout="position" className="whitespace-nowrap">
          0:02 / 1:41
        </motion.span>
      </div>
    </motion.div>
  )
}

export default VideoControls
