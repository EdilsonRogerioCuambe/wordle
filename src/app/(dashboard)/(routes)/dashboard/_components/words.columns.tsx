'use client'
import { Word, Category } from '@prisma/client'
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from 'lucide-react'
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

interface WordWithCategory extends Word {
  category: Category
}

export const wordsColumns: ColumnDef<WordWithCategory>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'value',
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
    cell: ({ row }) => {
      const { value } = row.original

      return <span className="capitalize">{value}</span>
    },
  },
  {
    accessorKey: 'name',
    header: 'Categoria',
    cell: ({ row }) => {
      const { name } = row.original.category

      return <span className="capitalize">{name}</span>
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const { id } = row.original

      const handleDelete = async () => {
        try {
          await axios.delete(`/api/words/${id}`)
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
          <DropdownMenuContent className="text-[#333333] z-50" align="end">
            <Link href={`/dashboard/edit-word/${id}`} passHref>
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
