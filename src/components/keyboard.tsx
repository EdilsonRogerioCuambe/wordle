import React from 'react'
import Key from './key'

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

interface KeyboardProps {
  onKeyClick: (key: string) => void
  keyStatuses: { [key: string]: 'correct' | 'present' | 'absent' | 'default' }
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyClick, keyStatuses }) => {
  return (
    <div className="flex flex-col items-center mt-4 space-y-1 sm:space-y-2">
      {keys.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center space-x-1 sm:space-x-2"
        >
          {row.map((key) => (
            <Key
              key={key}
              value={key}
              status={keyStatuses[key] || 'default'}
              onClick={() => onKeyClick(key)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
