import prisma from '@/utils/prisma'
import Board from '@/components/board'

export default async function Home() {
  const categories = await prisma.category.findMany({
    where: {
      words: {
        some: {
          value: {
            not: '',
          },
        },
      },
    },
    include: {
      words: true,
    },
  })

  return (
    <main className="flex flex-col items-center min-h-screen justify-center my-10">
      <h1 className="text-4xl font-bold my-4 uppercase">Adivinhe a Palavra</h1>
      <Board categories={categories} />
    </main>
  )
}