import { motion } from 'framer-motion'
import React from 'react'

interface KeyProps {
  value: string
  status: 'correct' | 'present' | 'absent' | 'default'
  onClick: (key: string) => void
}

const Key: React.FC<KeyProps> = ({ value, status, onClick }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'correct':
        return 'bg-green-500'
      case 'present':
        return 'bg-yellow-500'
      case 'absent':
        return 'border-2 border-[#f5f5f5]'
      default:
        return 'border-2 border-[#f5f5f5]'
    }
  }

  return (
    <motion.button
      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-lg ${getStatusClass()} text-white font-bold text-xs sm:text-sm md:text-lg lg:text-xl m-1`}
      onClick={() => onClick(value)}
      whileTap={{ scale: 0.9 }}
    >
      {value.toUpperCase()}
    </motion.button>
  )
}

export default Key
