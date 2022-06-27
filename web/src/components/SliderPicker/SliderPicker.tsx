import type { FC } from "react"
import { motion } from "framer-motion"

type Props = {
  className?: string
}

const SliderPicker: FC<Props> = ({ className = "" }) => {
  return (
    <div className={`relative h-[0.625rem] ${className}`}>
      <div className="absolute inset-0 rounded-full bg-white/50" />
      <motion.div
        style={{ width: 50 }}
        className="absolute inset-y-0 left-0 rounded-full bg-white"
      />
    </div>
  )
}

export default SliderPicker
