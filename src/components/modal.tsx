import { motion } from 'framer-motion'

interface ModalProps {
  isModalOpen: boolean
  closeModal: () => void
  MAX_ATTEMPTS: number
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  MAX_ATTEMPTS,
}) => {
  return (
    <>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div
            className="bg-[#333333] p-4 rounded-lg font-mono text-white max-w-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
          >
            <h2 className="text-2xl font-extrabold mb-4">Como Jogar</h2>
            <p className="mb-2">Bem-vindo ao WordQuest!</p>
            <ul className="list-disc pl-6">
              <li>
                Você tem um total de {MAX_ATTEMPTS} tentativas para adivinhar a
                palavra correta.
              </li>
              <li>
                Use o teclado virtual ou seu próprio teclado para digitar as
                palavras.
              </li>
              <li>
                Após digitar a palavra, pressione a tecla Enter para enviar a
                palavra.
              </li>
              <li>
                Cada letra da palavra será marcada como:
                <ul className="list-disc pl-6">
                  <li>
                    <span className="text-green-500 font-extrabold">Verde</span>
                    : a letra está correta e na posição correta.
                  </li>
                  <li>
                    <span className="text-yellow-500 font-extrabold">
                      Amarela
                    </span>
                    : a letra está correta, mas na posição errada.
                  </li>
                  <li>
                    <span className="font-extrabold">Cinza</span>: a letra não
                    está na palavra.
                  </li>
                </ul>
              </li>
              <li>Você pode usar dicas clicando no botão de dica.</li>
              <li>Divirta-se e boa sorte!</li>
            </ul>
            <button
              title="Começar o jogo"
              type="button"
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-white text-[#202024] font-extrabold rounded"
            >
              Começar
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default Modal
