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
  const [statuses, setStatuses] = useState<
    ('correct' | 'present' | 'absent')[][]
  >([])
  const [keyStatuses, setKeyStatuses] = useState<{
    [key: string]: 'correct' | 'present' | 'absent' | 'default'
  }>({})
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [animateRow, setAnimateRow] = useState<boolean>(false)
  const [hint, setHint] = useState<{ letter: string; position: number } | null>(
    null,
  )

  const handleSubmit = useCallback(() => {
    if (currentGuess.length === 5) {
      const newStatus = checkGuess(currentGuess)
      setStatuses((prevStatuses) => [...prevStatuses, newStatus])
      setGuesses((prevGuesses) => [...prevGuesses, currentGuess])
      setCurrentGuess('')
      setAnimateRow(true)

      setTimeout(() => {
        setAnimateRow(false)
      }, 1000) // Tempo total da animação de rotação

      if (currentGuess === answer || guesses.length + 1 === MAX_ATTEMPTS) {
        setGameOver(true)
      }
    }
  }, [currentGuess, guesses])

  useEffect(() => {
    const newKeyStatuses = { ...keyStatuses }
    guesses.forEach((guess, i) => {
      statuses[i].forEach((status, index) => {
        const letter = guess[index]
        if (status === 'correct') {
          newKeyStatuses[letter] = 'correct'
        } else if (
          status === 'present' &&
          newKeyStatuses[letter] !== 'correct'
        ) {
          newKeyStatuses[letter] = 'present'
        } else if (status === 'absent' && !newKeyStatuses[letter]) {
          newKeyStatuses[letter] = 'absent'
        }
      })
    })
    setKeyStatuses(newKeyStatuses)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses, statuses])

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
        <Row
          key={i}
          word={answer}
          guess={guess}
          status={statuses[i]}
          animate={true}
        />
      ))}
      {guesses.length < MAX_ATTEMPTS && !gameOver && (
        <>
          <Row
            word={answer}
            guess={currentGuess}
            status={Array(5).fill('absent')}
            onCellClick={handleCellClick}
            animate={animateRow}
          />
          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-2 bg-blue-500 text-white font-bold rounded"
            disabled={currentGuess.length !== 5}
          >
            Verificar
          </button>
        </>
      )}
      {hint && (
        <div className="text-lg mt-4 text-blue-600">
          Dica: A letra {hint.letter.toUpperCase()} está na posição{' '}
          {hint.position + 1}.
        </div>
      )}
      <div className="text-lg mt-4">
        {gameOver &&
          (guesses[guesses.length - 1] === answer
            ? 'Você acertou!'
            : 'Você perdeu! A palavra era ' + answer)}
      </div>
      <button
        onClick={handleHint}
        className="mt-2 px-4 py-2 bg-green-500 text-white font-bold rounded"
        disabled={gameOver || hint !== null}
      >
        Pedir Dica
      </button>
      <Keyboard onKeyClick={handleKeyClick} keyStatuses={keyStatuses} />
    </div>
  )
}

export default Board
