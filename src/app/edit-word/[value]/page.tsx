'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Category } from '@prisma/client'
import { motion } from 'framer-motion'

export default function EditWord() {
  const [word, setWord] = useState('')
  const [hints, setHints] = useState<string[]>([''])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [newHint, setNewHint] = useState('')
  const router = useRouter()
  const { value } = useParams()

  useEffect(() => {
    async function fetchWord() {
      try {
        const { data } = await axios.get(`/api/words/${value}`)
        setWord(data.value)
        setHints(data.hints || [])
        setSelectedCategory(data.categoryId)
      } catch (error) {
        console.error(error)
        toast.error('Falha ao buscar a palavra')
        router.push('/')
      }
    }

    async function fetchCategories() {
      try {
        const { data } = await axios.get('/api/categories')
        setCategories(data)
      } catch (error) {
        console.error(error)
        toast.error('Falha ao buscar categorias')
        router.push('/')
      }
    }
    fetchWord()
    fetchCategories()
  }, [router, value])

  const handleAddHint = async () => {
    if (newHint.trim() === '') {
      toast.error('A dica não pode estar vazia')
      return
    }

    try {
      const updatedHints = [...hints, newHint]
      await axios.patch(`/api/words/${value}`, {
        hints: updatedHints,
      })
      setHints(updatedHints)
      setNewHint('')
      toast.success('Dica adicionada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Falha ao adicionar dica')
    }
  }

  const handleHintChange = (index: number, value: string) => {
    const newHints = hints.slice()
    newHints[index] = value
    setHints(newHints)
  }

  const handleRemoveHint = async (index: number) => {
    const updatedHints = hints.slice()
    updatedHints.splice(index, 1)

    try {
      await axios.patch(`/api/words/${value}`, {
        hints: updatedHints,
      })
      setHints(updatedHints)
      toast.success('Dica removida com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Falha ao remover dica')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory || !word) {
      toast.error('Por favor, preencha todos os campos')
      return
    }

    try {
      await axios.patch(`/api/words/${value}`, {
        word,
        categoryId: selectedCategory,
      })
      toast.success('Palavra atualizada com sucesso!')
      router.push('/')
    } catch (error) {
      console.error(error)
      toast.error('Falha ao atualizar palavra')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 md:px-0 px-8">
      <h1 className="md:text-4xl text-2xl font-bold mb-8">Editar Palavra</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl text-[#f5f5f5]">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <div className="border-2 border-[#f5f5f5] p-4 rounded-lg">
              <label
                className="block text-[#f5f5f5] text-sm font-bold mb-2"
                htmlFor="category"
              >
                Categoria
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent shadow appearance-none border cursor-pointer rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className="bg-[#333333] text-[#f5f5f5] cursor-pointer hover:bg-[#444444] hover:text-[#f5f5f5]"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="border-2 border-[#f5f5f5] p-4 rounded-lg my-4">
              <label
                className="block text-[#f5f5f5] text-sm font-bold mb-2"
                htmlFor="word"
              >
                Palavra
              </label>
              <input
                type="text"
                id="word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <button
                type="submit"
                className="mt-2 transition-all duration-300 ease-in-out bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Atualizar Palavra
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <div className="border-2 border-[#f5f5f5] p-4 rounded-lg">
              <label
                className="block text-[#f5f5f5] text-sm font-bold mb-2"
                htmlFor="newHint"
              >
                Nova Dica
              </label>
              <input
                type="text"
                id="newHint"
                value={newHint}
                onChange={(e) => setNewHint(e.target.value)}
                className="bg-[#333333] shadow appearance-none border rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline focus:ring-0 ring-0"
              />
              <button
                type="button"
                onClick={handleAddHint}
                className="mt-2 transition-all duration-300 ease-in-out bg-purple-400 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Adicionar Dica
              </button>
            </div>
            {hints.map((hint, index) => (
              <motion.div
                key={index}
                className="border-2 border-[#f5f5f5] p-4 rounded-lg my-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <label
                  className="block text-[#f5f5f5] text-sm font-bold mb-2"
                  htmlFor={`hint-${index}`}
                >
                  Dica {index + 1}
                </label>
                <input
                  type="text"
                  id={`hint-${index}`}
                  value={hint}
                  onChange={(e) => handleHintChange(index, e.target.value)}
                  className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline"
                  disabled
                />
                <button
                  type="button"
                  onClick={() => handleRemoveHint(index)}
                  className="mt-2 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Remover Dica
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}
