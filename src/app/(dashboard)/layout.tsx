import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 md:px-0 px-8">
      {children}
    </div>
  )
}
