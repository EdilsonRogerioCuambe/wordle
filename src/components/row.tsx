import React from 'react'
import Cell from './cell'

interface RowProps {
  word: string
  guess: string
  status: ('correct' | 'present' | 'absent')[]
  onCellClick?: (index: number) => void
  animate?: boolean
}

const Row: React.FC<RowProps> = ({ guess, status, onCellClick, animate }) => {
  return (
    <div className="flex space-x-1 sm:space-x-2">
      {Array.from({ length: guess.length }, (_, i) => (
        <Cell
          key={i}
          value={guess[i] || ''}
          status={status[i] || 'absent'}
          onClick={onCellClick ? () => onCellClick(i) : undefined}
          animate={animate || false}
          delay={i * 0.2}
        />
      ))}
    </div>
  )
}

export default Row
