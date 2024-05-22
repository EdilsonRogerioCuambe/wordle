import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wordle Clone',
  description: 'Tente adivinhar a palavra secreta!',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.className} bg-[#333333] text-[#f5f5f5]`}>
        {children}
      </body>
    </html>
  )
}
