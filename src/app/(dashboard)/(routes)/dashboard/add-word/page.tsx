'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import type { Category } from '@prisma/client'

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [word, setWord] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get('/api/categories')
        setCategories(data)
        if (data.length > 0) {
          setSelectedCategory(data[0].id)
        }
      } catch (error) {
        console.error(error)
        toast.error('Falha ao buscar categorias')
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory || !word) {
      toast.error('Por favor, preencha todos os campos')
      return
    }

    try {
      const response = await axios.post('/api/words', {
        value: word.toLowerCase(),
        categoryId: selectedCategory,
      })
      toast.success('Palavra adicionada com sucesso!')
      const value = response.data.value
      router.push(`/edit-word/${value}`)
    } catch (error) {
      console.error(error)
      toast.error('Falha ao adicionar palavra')
    } finally {
      setWord('')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="md:text-4xl text-2xl font-bold mb-8">
        Adicionar Nova Palavra
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-lg border-2 border-[#f5f5f5] text-[#f5f5f5]"
      >
        <div className="mb-4">
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
            className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="bg-[#333333] text-[#f5f5f5]"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
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
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="border-2 border-[#f5f5f5] hover:bg-[#333333] hover:border-[#f5f5f5] hover:text-white text-white flex justify-center items-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Adicionar Palavra
          </button>
        </div>
      </form>
    </div>
  )
}
