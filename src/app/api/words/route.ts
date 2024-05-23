import { NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'

export async function POST(request: Request) {
  const { value, categoryId } = await request.json()

  try {
    const word = await prisma.word.create({
      data: {
        value,
        categoryId,
      },
    })

    return NextResponse.json(word)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Failed to add category', { status: 500 })
  }
}

export async function GET() {
  try {
    const words = await prisma.word.findMany()

    return NextResponse.json(words)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Failed to fetch words', { status: 500 })
  }
}
