/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client')
const importedCategories = require('./categories') // renamed to importedCategories
const removeAccents = require('remove-accents')

const prisma = new PrismaClient()

const normalizeString = (str: string) => {
  return removeAccents(str).toLowerCase()
}

const categoriesIds = [
  {
    id: 'd2955b58-2f6c-4430-8f95-60afa2ddf14b',
    name: 'Profissoes',
  },
  {
    id: '8534277c-fffc-48de-9870-cf638c9106c1',
    name: 'Objetos',
  },
  {
    id: '6cd6abfd-0632-446d-8412-107fa7e08166',
    name: 'Esportes',
  },
  {
    id: '74a4cbec-ff61-41fa-be2e-f4eeac9a257c',
    name: 'Frutas',
  },
  {
    id: '6da44266-f5dd-4ff1-8542-00973b9c757b',
    name: 'Paises',
  },
  {
    id: 'b6ec7bb0-3c4e-48d0-9074-116ae6cefbe2',
    name: 'Cores',
  },
  {
    id: 'ed83c89c-0822-4877-b4b2-430c271ecff7',
    name: 'Animais',
  },
]

async function main() {
  for (const { id, name } of categoriesIds) {
    const categoryData = importedCategories[name]

    if (!categoryData) {
      console.warn(`No data found for category ${name}`)
      continue
    }

    for (const word of categoryData.words) {
      const normalizedWord = normalizeString(word)
      const hints = categoryData.hints[word] || []

      const existingWord = await prisma.word.findUnique({
        where: { value: normalizedWord },
      })

      if (!existingWord) {
        await prisma.word.create({
          data: {
            value: normalizedWord,
            hints: hints.map(normalizeString),
            categoryId: id,
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
