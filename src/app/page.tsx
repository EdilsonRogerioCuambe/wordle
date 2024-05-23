import Board from '@/components/board'

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen justify-center my-10">
      <h1 className="text-4xl font-bold my-4 uppercase">Wordle Clone</h1>
      <Board />
    </main>
  )
}
