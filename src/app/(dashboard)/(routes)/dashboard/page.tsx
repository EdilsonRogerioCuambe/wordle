import prisma from '@/utils/prisma'
import { categoriesColumns } from './_components/categories.columns'
import { DataCategoriesTable } from './_components/categories.data.table'
import { DataWordsTable } from './_components/words.data.table'
import { wordsColumns } from './_components/words.columns'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const categories = await prisma.category.findMany()
  const words = await prisma.word.findMany({
    include: { category: true },
  })
  return (
    <>
      <h1 className="md:text-4xl text-2xl font-bold mb-8">Dashboard</h1>

      <div className="w-full max-w-6xl">
        <DataCategoriesTable columns={categoriesColumns} data={categories} />
        <DataWordsTable columns={wordsColumns} data={words} />
      </div>
    </>
  )
}
