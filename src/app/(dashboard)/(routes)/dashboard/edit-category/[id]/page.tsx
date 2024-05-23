'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import { FaCloudUploadAlt } from 'react-icons/fa'
import Image from 'next/image'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Link from 'next/link'

export default function EditCategory() {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategory() {
      try {
        const { data } = await axios.get(`/api/categories/${id}`)
        setName(data.name)
        setCurrentImage(data.image)
        setImage(data.image)
      } catch (error) {
        console.error(error)
        toast.error('Failed to load category')
      }
    }

    fetchCategory()
  }, [id])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        setImage(reader.result as string)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !image) {
      toast.error('Please provide both name and image')
      return
    }

    try {
      setLoading(true)
      let imageUrl = currentImage

      if (image !== currentImage) {
        const response = await fetch(image)
        const blob = await response.blob()

        const storageRef = ref(storage, `categories/${name}`)
        await uploadBytes(storageRef, blob)

        imageUrl = await getDownloadURL(storageRef)
      }

      await axios.patch(`/api/categories/${id}`, { name, image: imageUrl })
      toast.success('Category updated successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {/** link para voltar ao dashboard */}
      <Link
        href="/dashboard"
        className="text-[#f5f5f5] hover:text-white mb-4 text-sm"
      >
        Voltar ao Dashboard
      </Link>
      <h1 className="md:text-4xl text-2xl font-bold mb-8">Editar Categoria</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-lg border-2 border-[#f5f5f5] text-[#f5f5f5]"
      >
        <div className="mb-4">
          <label
            className="block text-[#f5f5f5] text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nome da Categoria
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-[#f5f5f5] leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-[#f5f5f5] text-sm font-bold mb-2"
            htmlFor="image"
          >
            Imagem
          </label>
          <div className="flex items-center">
            <label
              className="flex flex-col items-center px-4 py-6 bg-[#333333] text-[#f5f5f5] rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-[#222222] hover:text-white"
              htmlFor="image"
            >
              <FaCloudUploadAlt className="text-4xl" />
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
            {image && (
              <Image
                src={image}
                alt="Preview"
                className="ml-4 w-24 h-24 object-cover rounded-lg"
                width={100}
                height={100}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={!name || !image}
            className={`${
              !name || !image
                ? 'cursor-not-allowed bg-[#333333] text-[#f5f5f5]'
                : 'border-2 border-[#f5f5f5] hover:bg-[#333333] hover:border-[#f5f5f5] hover:text-white'
            } text-white flex justify-center items-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              'Salvar Alterações'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
