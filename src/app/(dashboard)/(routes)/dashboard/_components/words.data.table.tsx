'use client'
import { useState } from 'react'
import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'

interface HasId {
  id: string
}

interface DataTableProps<TData extends HasId, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataWordsTable<TData extends HasId, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [selectedWords, setSelectedWords] = useState<string[]>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleSelectWord = (id: string) => {
    setSelectedWords((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((wordId) => wordId !== id)
        : [...prevSelected, id],
    )
  }

  const handleDeleteSelected = async () => {
    try {
      await axios.delete('/api/words', {
        data: { ids: selectedWords },
      })
      toast.success('Palavras deletadas com sucesso!')
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="text-[#f5f5f5] my-5 border-2 p-4 border-[#f5f5f5] rounded-lg">
      <div className="flex items-center py-4 justify-between gap-x-2">
        <Input
          placeholder='Pesquisar palavra por "nome"'
          value={(table.getColumn('value')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('value')?.setFilterValue(event.target.value)
          }
          className="max-w-sm w-full bg-transparent border-2 text-[#f5f5f5] placeholder:text-[#f5f5f5] border-[#f5f5f5]"
        />
        <Input
          placeholder='Pesquisar palavra por "categoria"'
          value={
            (table.getColumn('category')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('category')?.setFilterValue(event.target.value)
          }
          className="max-w-sm w-full bg-transparent border-2 text-[#f5f5f5] placeholder:text-[#f5f5f5] border-[#f5f5f5]"
        />
        <Link href="/dashboard/add-word" passHref>
          <Button
            variant="outline"
            className="bg-transparent transition-all duration-300 ease-in-out hover:text-[#f5f5f5] hover:bg-[#121214]"
          >
            Adicionar Nova Palavra
          </Button>
        </Link>
      </div>
      <div className="my-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead>
                  <input
                    title="Selecionar todas as palavras para deletar"
                    type="checkbox"
                    onChange={() => {
                      const allIds = table
                        .getRowModel()
                        .rows.map((row) => row.original.id)
                      if (selectedWords.length === allIds.length) {
                        setSelectedWords([])
                      } else {
                        setSelectedWords(allIds)
                      }
                    }}
                    checked={
                      selectedWords.length === table.getRowModel().rows.length
                    }
                  />
                </TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-[#c3c3cc] hover:text-[#f5f5f5] cursor-pointer"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="hover:bg-[#202024] hover:rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#f5f5f5]"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  <TableCell>
                    <input
                      title="Selecionar palavra para deletar"
                      type="checkbox"
                      checked={selectedWords.includes(row.original.id)}
                      onChange={() => handleSelectWord(row.original.id)}
                    />
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhuma categoria encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between text-[#f5f5f5] space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteSelected}
          className="bg-transparent transition-all duration-300 ease-in-out hover:text-[#f5f5f5] hover:bg-[#121214]"
        >
          Deletar Selecionadas
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-transparent transition-all duration-300 ease-in-out hover:text-[#f5f5f5] hover:bg-[#121214]"
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-transparent transition-all duration-300 ease-in-out hover:text-[#f5f5f5] hover:bg-[#121214]"
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
