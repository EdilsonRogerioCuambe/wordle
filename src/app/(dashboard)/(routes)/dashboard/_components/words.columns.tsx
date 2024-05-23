'use client'
import { Word } from '@prisma/client'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

export const wordsColumns: ColumnDef<Word>[] = [
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
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-[#333333]" align="end">
            <Link href={`/dashboard/edit-word/${id}`} passHref>
              <DropdownMenuItem className="text-[#f5f5f5] bg-[#333333] flex items-center px-4 py-2 rounded">
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
