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
    const words = await prisma.word.findMany({
      include: { category: true },
    })

    return NextResponse.json(words)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Failed to fetch words', { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { ids } = await request.json()

  if (!ids || !Array.isArray(ids)) {
    return new NextResponse('Invalid request payload', { status: 400 })
  }

  try {
    await prisma.word.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })

    return NextResponse.json({ message: 'Words deleted successfully!' })
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Failed to delete words', { status: 500 })
  }
}
