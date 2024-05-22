import Board from '@/components/board'

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold my-4 uppercase">Wordle Clone</h1>
      <Board />
    </main>
  )
}
