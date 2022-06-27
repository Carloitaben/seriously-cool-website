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
      className="relative -mt-60 flex h-60 flex-col justify-end space-y-4 bg-gradient-to-b from-transparent to-black/25 px-8 pb-6 text-white"
    >
      <SliderPicker />
      <div className="flex w-full items-center">
        <div className="space-between flex w-full items-center">
          <button className="mr-3 flex h-12 w-12 items-center justify-start">
            {video.current?.paused ? play : pause}
          </button>
          <SliderPicker className="w-32" />
        </div>
        <motion.div layout="position" className="whitespace-nowrap">
          0:02 / 1:41
        </motion.div>
      </div>
    </motion.div>
  )
}

export default VideoControls
