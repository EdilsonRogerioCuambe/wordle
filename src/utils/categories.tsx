import { StaticImageData } from 'next/image'
import animais from '@/assets/animais.png'
import frutas from '@/assets/frutas.png'
import objetos from '@/assets/objetos.png'
import cores from '@/assets/cores.png'
import paises from '@/assets/paises.png'
import profissoes from '@/assets/profissoes.png'
import esportes from '@/assets/esportes.png'

const categories: {
  [key: string]: {
    words: string[]
    image: StaticImageData
  }
} = {
  animais: {
    words: [
      'cachorro',
      'gato',
      'elefante',
      'tigre',
      'leão',
      'girafa',
      'urso',
      'coelho',
      'raposa',
      'veado',
    ],
    image: animais,
  },
  frutas: {
    words: [
      'maçã',
      'banana',
      'laranja',
      'uva',
      'melancia',
      'abacaxi',
      'morango',
      'manga',
      'kiwi',
      'pera',
    ],
    image: frutas,
  },
  objetos: {
    words: [
      'mesa',
      'cadeira',
      'computador',
      'telefone',
      'livro',
      'caderno',
      'caneta',
      'lápis',
      'janela',
      'porta',
    ],
    image: objetos,
  },
  cores: {
    words: [
      'vermelho',
      'azul',
      'amarelo',
      'verde',
      'preto',
      'branco',
      'cinza',
      'rosa',
      'roxo',
      'marrom',
    ],
    image: cores,
  },
  países: {
    words: [
      'brasil',
      'argentina',
      'canadá',
      'méxico',
      'alemanha',
      'frança',
      'japão',
      'china',
      'rússia',
      'índia',
    ],
    image: paises,
  },
  profissões: {
    words: [
      'médico',
      'engenheiro',
      'professor',
      'advogado',
      'dentista',
      'enfermeiro',
      'arquiteto',
      'pintor',
      'ator',
      'cantor',
    ],
    image: profissoes,
  },
  esportes: {
    words: [
      'futebol',
      'basquete',
      'vôlei',
      'natação',
      'tênis',
      'golfe',
      'boxe',
      'corrida',
      'ciclismo',
      'surf',
    ],
    image: esportes,
  },
}

export default categories
