import { motion } from 'framer-motion'

interface CellProps {
  value: string
  status: 'correct' | 'present' | 'absent'
  animate: boolean
  delay: number
  onClick?: () => void
}

const Cell: React.FC<CellProps> = ({
  value,
  status,
  animate,
  delay,
  onClick,
}) => {
  const getStatusClass = () => {
    switch (status) {
      case 'correct':
        return 'bg-green-500'
      case 'present':
        return 'bg-yellow-500'
      case 'absent':
        return 'border-2 border-[#f5f5f5] rounded-lg'
      default:
        return 'border-2 border-[#f5f5f5] rounded-lg'
    }
  }

  return (
    <motion.div
      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 uppercase rounded-lg flex items-center justify-center border font-bold text-sm sm:text-lg md:text-xl relative ${getStatusClass()}`}
      initial={animate ? { rotateY: 0 } : false}
      animate={animate ? { rotateY: 180 } : undefined}
      transition={animate ? { duration: 0.5, delay } : undefined}
      style={{ transformStyle: 'preserve-3d' }}
      onClick={onClick}
    >
      <motion.div
        className="absolute w-full h-full flex items-center justify-center"
        style={{ backfaceVisibility: 'hidden' }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 180 }}
        transition={{ duration: 0.5, delay }}
      >
        {value}
      </motion.div>
      <motion.div
        className="absolute w-full h-full flex items-center justify-center"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        initial={{ rotateY: -180 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        {value}
      </motion.div>
    </motion.div>
  )
}

export default Cell
