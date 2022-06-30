import type { FC } from "react"
import { motion } from "framer-motion"

type Props = {
  className?: string
}

const SliderPicker: FC<Props> = ({ className = "" }) => {
  return (
    <div className={`relative h-2 ${className}`}>
      <div className="absolute inset-0 rounded-full bg-white/50" />
      <motion.div className="absolute top-0 left-0 -mt-1 h-4 w-4 rounded-full bg-white" />
    </div>
  )
}

export default SliderPicker
