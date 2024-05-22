'use client'
import React from 'react'
import Cell from './cell'

interface RowProps {
  word: string
  guess: string
  status: ('correct' | 'present' | 'absent')[]
  onCellClick?: (index: number) => void
}

const Row: React.FC<RowProps> = ({ guess, status, onCellClick }) => {
  return (
    <div className="flex space-x-2">
      {Array.from({ length: 5 }, (_, i) => (
        <Cell
          key={i}
          value={guess[i] || ''}
          status={status[i] || 'absent'}
          onClick={onCellClick ? () => onCellClick(i) : undefined}
        />
      ))}
    </div>
  )
}

export default Row
