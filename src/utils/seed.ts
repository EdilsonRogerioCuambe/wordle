import { PrismaClient } from '@prisma/client'
import categories from './categories'

const prisma = new PrismaClient()

async function main() {
  for (const categoryName in categories) {
    const categoryData = categories[categoryName]

    const existingCategory = await prisma.category.findUnique({
      where: { name: categoryName },
    })

    let category
    if (existingCategory) {
      category = existingCategory
    }

    if (!category) {
      throw new Error('Category not found')
    }

    for (const word of categoryData.words) {
      const hints = categoryData.hints[word] || []

      const existingWord = await prisma.word.findUnique({
        where: { value: word },
      })

      if (!existingWord) {
        await prisma.word.create({
          data: {
            value: word,
            hints,
            categoryId: category.id,
          },
        })
      }
    }
  }

  console.log('Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
