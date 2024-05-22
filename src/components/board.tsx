'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Row from './row'
import Keyboard from './keyboard'

const wordList = ['react', 'apple', 'table', 'chair', 'stone']
const answer = wordList[Math.floor(Math.random() * wordList.length)]

const MAX_ATTEMPTS = 6

const Board: React.FC = () => {
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [keyStatuses, setKeyStatuses] = useState<{
    [key: string]: 'correct' | 'present' | 'absent' | 'default'
  }>({})
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [hint, setHint] = useState<{ letter: string; position: number } | null>(
    null,
  )

  const handleSubmit = useCallback(() => {
    if (currentGuess.length === 5) {
      setGuesses((prevGuesses) => [...prevGuesses, currentGuess])
      setCurrentGuess('')

      if (currentGuess === answer || guesses.length + 1 === MAX_ATTEMPTS) {
        setGameOver(true)
      }
    }
  }, [currentGuess, guesses])

  useEffect(() => {
    const newStatuses = { ...keyStatuses }
    guesses.forEach((guess) => {
      guess.split('').forEach((letter, index) => {
        if (answer.includes(letter)) {
          newStatuses[letter] = answer[index] === letter ? 'correct' : 'present'
        } else {
          newStatuses[letter] = 'absent'
        }
      })
    })
    setKeyStatuses(newStatuses)
    setHint(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses])

  const checkGuess = (guess: string) => {
    const status: ('correct' | 'present' | 'absent')[] = Array(5).fill('absent')

    for (let i = 0; i < 5; i++) {
      if (guess[i] === answer[i]) {
        status[i] = 'correct'
      } else if (answer.includes(guess[i])) {
        status[i] = 'present'
      }
    }

    return status
  }

  const handleKeyClick = (key: string) => {
    if (gameOver) return
    if (key === 'Enter') {
      handleSubmit()
    } else if (key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1))
    } else if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key.toLowerCase())
    }
  }

  const handleCellClick = (index: number) => {
    if (currentGuess.length > index) {
      setCurrentGuess(
        currentGuess.slice(0, index) + currentGuess.slice(index + 1),
      )
    }
  }

  const handleHint = () => {
    for (let i = 0; i < answer.length; i++) {
      if (!guesses.some((guess) => guess[i] === answer[i])) {
        setHint({ letter: answer[i], position: i })
        break
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {guesses.map((guess, i) => (
        <Row key={i} word={answer} guess={guess} status={checkGuess(guess)} />
      ))}
      {guesses.length < MAX_ATTEMPTS && !gameOver && (
        <>
          <Row
            word={answer}
            guess={currentGuess}
            status={Array(5).fill('absent')}
            onCellClick={handleCellClick}
          />
          <div className="flex justify-center space-x-2">
            <button
              title="Verificar"
              type="button"
              onClick={handleSubmit}
              className={`px-4 py-2 bg-green-500 text-white font-bold rounded ${
                currentGuess.length !== 5 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentGuess.length !== 5}
            >
              Verificar
            </button>
            <button
              title="Dica"
              type="button"
              onClick={handleHint}
              className={`px-4 py-2 bg-blue-500 text-white font-bold rounded ${
                hint ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Dica
            </button>
          </div>
        </>
      )}
      {hint && (
        <div className="text-lg">
          A letra <strong>{hint.letter}</strong> está na posição{' '}
          <strong>{hint.position + 1}</strong>
        </div>
      )}
      <div className="text-lg mt-4">
        {gameOver &&
          (guesses[guesses.length - 1] === answer
            ? 'Você acertou!'
            : 'Você perdeu! A palavra era ' + answer)}
      </div>
      <Keyboard onKeyClick={handleKeyClick} keyStatuses={keyStatuses} />
    </div>
  )
}

export default Board
