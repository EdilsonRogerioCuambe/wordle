'use client'
import { useState, useEffect, useCallback } from 'react'
import { FaRegLightbulb } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Row from './row'
import Keyboard from './keyboard'

const wordCategories: { [category: string]: string[] } = {
  animals: ['dog', 'cat', 'mouse', 'horse', 'elephant'],
  fruits: ['apple', 'banana', 'cherry', 'grape', 'orange'],
  objects: ['table', 'chair', 'stone', 'pencil', 'book'],
}

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [answer, setAnswer] = useState<string>('')

  const checkGuess = useCallback(
    (guess: string): ('correct' | 'present' | 'absent')[] => {
      const status: ('correct' | 'present' | 'absent')[] = Array(
        answer.length,
      ).fill('absent')

      for (let i = 0; i < answer.length; i++) {
        if (guess[i] === answer[i]) {
          status[i] = 'correct'
        } else if (answer.includes(guess[i])) {
          status[i] = 'present'
        }
      }

      return status
    },
    [answer],
  )

  useEffect(() => {
    if (selectedCategory) {
      const newAnswer =
        wordCategories[selectedCategory][
          Math.floor(Math.random() * wordCategories[selectedCategory].length)
        ]
      setAnswer(newAnswer)
      setGuesses([])
      setCurrentGuess('')
      setStatuses([])
      setKeyStatuses({})
      setGameOver(false)
      setHint(null)
    }
  }, [selectedCategory])

  const handleSubmit = useCallback(() => {
    if (currentGuess.length === answer.length) {
      const newStatus = checkGuess(currentGuess)
      setStatuses((prevStatuses) => [...prevStatuses, newStatus])
      setGuesses((prevGuesses) => [...prevGuesses, currentGuess])
      setCurrentGuess('')
      setAnimateRow(true)

      setTimeout(() => {
        setAnimateRow(false)
      }, 1000)

      if (currentGuess === answer || guesses.length + 1 === MAX_ATTEMPTS) {
        setGameOver(true)
      }
    }
  }, [currentGuess, answer, checkGuess, guesses.length])

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
  }, [guesses, statuses, keyStatuses])

  const handleKeyClick = (key: string) => {
    if (gameOver) return
    if (key === 'Enter') {
      handleSubmit()
    } else if (key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1))
    } else if (currentGuess.length < answer.length && /^[a-zA-Z]$/.test(key)) {
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

  if (!selectedCategory) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">Selecione uma categoria</h2>
        {Object.keys(wordCategories).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
          >
            {category}
          </button>
        ))}
      </div>
    )
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
            status={Array(answer.length).fill('absent')}
            onCellClick={handleCellClick}
            animate={animateRow}
          />
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSubmit}
              className={`px-4 py-2 bg-blue-500 text-white font-extrabold rounded ${
                currentGuess.length !== answer.length
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={currentGuess.length !== answer.length}
            >
              Verificar
            </button>
            <button
              title="Dica"
              type="button"
              onClick={handleHint}
              className={`px-4 py-2 bg-yellow-500 text-white font-extrabold rounded ${
                hint !== null ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={gameOver || hint !== null}
            >
              <FaRegLightbulb className="inline-block" />
            </button>
          </div>
        </>
      )}
      {hint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center uppercase space-x-2 text-lg"
        >
          <span>Dica:</span>
          <span className="text-green-400 font-extrabold">{hint.letter}</span>
          <span>na posição {hint.position + 1}</span>
        </motion.div>
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
