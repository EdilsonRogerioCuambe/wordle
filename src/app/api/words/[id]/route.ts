import { NextResponse } from 'next/server'
import prisma from '@/utils/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    const word = await prisma.word.findUnique({
      where: {
        id,
      },
    })

    if (!word) {
      return new NextResponse('Word not found', { status: 404 })
    }

    return NextResponse.json(word)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Failed to fetch word', { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const values = await request.json()
  const { id } = params

  try {
    const word = await prisma.word.findUnique({
      where: {
        id,
      },
    })

    if (!word) {
      return new NextResponse('Word not found', { status: 404 })
    }

    const updatedWord = await prisma.word.update({
      where: {
        id: word.id,
      },
      data: {
        value: values.value,
        hints: values.hints,
        categoryId: values.categoryId,
      },
    })

    return NextResponse.json(updatedWord)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Failed to update word', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  if (!id) {
    return new NextResponse('Please provide the word name', {
      status: 400,
    })
  }

  try {
    const word = await prisma.word.findUnique({
      where: {
        id,
      },
    })

    if (!word) {
      return new NextResponse('Word not found', { status: 404 })
    }

    await prisma.word.delete({
      where: {
        id: word.id,
      },
    })

    return NextResponse.json({ message: 'Word deleted successfully!' })
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Failed to delete word', { status: 500 })
  }
}
