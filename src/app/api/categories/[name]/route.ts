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
  { params }: { params: { name: string } },
) {
  const values = await request.json()
  const { name } = params

  try {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    })

    if (!category) {
      return new NextResponse('Category not found', { status: 404 })
    }

    const updatedCategory = await prisma.category.update({
      where: {
        name: category.name,
      },
      data: {
        ...values,
      },
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Failed to update category', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { name: string } },
) {
  const { name } = params

  try {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    })

    if (!category) {
      return new NextResponse('Category not found', { status: 404 })
    }

    const deletedCategory = await prisma.category.delete({
      where: {
        name: category.name,
      },
    })

    return NextResponse.json(deletedCategory)
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 })
    }
    return new NextResponse('Failed to delete category', { status: 500 })
  }
}
