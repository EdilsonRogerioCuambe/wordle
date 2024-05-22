'use client'
import { motion } from 'framer-motion'
import React from 'react'

interface CellProps {
  value: string
  status: 'correct' | 'present' | 'absent'
  onClick?: () => void
}

const Cell: React.FC<CellProps> = ({ value, status, onClick }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'correct':
        return 'bg-green-500'
      case 'present':
        return 'bg-yellow-500'
      case 'absent':
        return 'bg-[#121214]'
      default:
        return 'bg-[#121214]'
    }
  }

  return (
    <motion.div
      className={`w-14 h-14 uppercase rounded-lg flex items-center justify-center border ${getStatusClass()} font-bold text-xl`}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      onClick={onClick} // Adicionando manipulador de clique
    >
      {value}
    </motion.div>
  )
}

export default Cell
