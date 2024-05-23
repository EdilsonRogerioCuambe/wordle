import { NextResponse } from 'next/server'
import prisma from '@/utils/prisma'

export async function GET(
  request: Request,
  { params }: { params: { value: string } },
) {
  const { value } = params

  try {
    const word = await prisma.word.findUnique({
      where: {
        value,
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
  { params }: { params: { value: string } },
) {
  const values = await request.json()
  const { value } = params

  try {
    const word = await prisma.word.findUnique({
      where: {
        value,
      },
    })

    if (!word) {
      return new NextResponse('Word not found', { status: 404 })
    }

    const updatedWord = await prisma.word.update({
      where: {
        value: word.value,
      },
      data: {
        value: values.word,
        categoryId: values.categoryId,
        hints: values.hints,
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
  { params }: { params: { value: string } },
) {
  const { value } = params

  if (!value) {
    return new NextResponse('Please provide the word name', {
      status: 400,
    })
  }

  try {
    const word = await prisma.word.findUnique({
      where: {
        value,
      },
    })

    if (!word) {
      return new NextResponse('Word not found', { status: 404 })
    }

    await prisma.word.delete({
      where: {
        value: word.value,
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
