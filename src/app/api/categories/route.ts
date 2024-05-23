import { NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'

export async function POST(request: Request) {
  const { name, image } = await request.json()

  if (!name || !image) {
    return new NextResponse('Please provide both name and image', {
      status: 400,
    })
  }

  try {
    await prisma.category.create({
      data: {
        name,
        image,
      },
    })

    return NextResponse.json({ message: 'Category added successfully!' })
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Failed to add category', { status: 500 })
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { words: true },
    })

    return NextResponse.json(categories)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Failed to fetch categories', { status: 500 })
  }
}
