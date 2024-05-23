import { motion } from 'framer-motion'
import React from 'react'
import { FaLevelUpAlt, FaBackspace } from 'react-icons/fa'

interface KeyProps {
  value: string
  status: 'correct' | 'present' | 'absent' | 'default'
  onClick: (key: string) => void
  isEnterKey?: boolean
  isBackspaceKey?: boolean
  disabled?: boolean
}

const Key: React.FC<KeyProps> = ({
  value,
  status,
  onClick,
  isEnterKey,
  isBackspaceKey,
  disabled,
}) => {
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
      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-lg ${getStatusClass()} text-white font-bold text-xs sm:text-sm md:text-lg lg:text-xl m-1 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disabled && onClick(value)}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      disabled={disabled}
    >
      {isEnterKey ? (
        <FaLevelUpAlt size={20} className="transform rotate-90" />
      ) : isBackspaceKey ? (
        <FaBackspace size={20} />
      ) : (
        value.toUpperCase()
      )}
    </motion.button>
  )
}

export default Key
