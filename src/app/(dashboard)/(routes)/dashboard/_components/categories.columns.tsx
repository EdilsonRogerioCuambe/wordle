'use client'
import {
  Image as LucidImageIcon,
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash,
} from 'lucide-react'
import Image from 'next/image'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Category } from '@prisma/client'

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'image',
    header: 'Imagem',
    cell: ({ row }) => {
      const { image, name } = row.original

      return (
        <div className="flex items-center space-x-2">
          <div className="relative">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={50}
                height={50}
                className="object-cover"
              />
            ) : (
              <LucidImageIcon className="w-10 h-10 rounded-md" />
            )}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const { id } = row.original

      const handleDelete = async () => {
        try {
          await axios.delete(`/api/categories/${id}`)
          toast.success('Palavra deletada com sucesso!')
          window.location.reload()
        } catch (error) {
          console.error(error)
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-[#333333]" align="end">
            <Link href={`/dashboard/edit-category/${id}`} passHref>
              <DropdownMenuItem className="text-[#f5f5f5] bg-[#121214] flex items-center px-4 py-2 rounded">
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="text-[#f5f5f5] bg-[#121214] flex items-center px-4 py-2 rounded"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4 mr-2" />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
