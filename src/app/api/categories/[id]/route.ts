import { NextResponse } from 'next/server'
import prisma from '@/utils/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) {
      return new NextResponse('Category not found', { status: 404 })
    }

    return NextResponse.json(category)
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
  const ids = await request.json()
  const { id } = params

  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) {
      return new NextResponse('Category not found', { status: 404 })
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        ...ids,
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
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) {
      return new NextResponse('Category not found', { status: 404 })
    }

    const deletedCategory = await prisma.category.delete({
      where: {
        id: category.id,
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
