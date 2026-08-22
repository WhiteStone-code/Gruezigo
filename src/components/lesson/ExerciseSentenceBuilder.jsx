import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { Button } from '../ui/Button.jsx'

function shuffleWords(words) {
  const indices = words.map((_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }
  return indices
}

function joinSentence(words) {
  // Junta tokens sin espacio antes de la puntuación (",", "?", "!").
  return words.reduce((acc, w) => {
    if (!acc) return w
    if (/^[,.?!]$/.test(w)) return acc + w
    return `${acc} ${w}`
  }, '')
}

/**
 * Módulo "construcción de oraciones": el usuario toca palabras sueltas de un
 * banco desordenado para reconstruir la frase en el orden correcto.
 */
export function ExerciseSentenceBuilder({ exercises, onComplete }) {
  const { interfaceLang, t } = useLanguage()
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState([])
  const [bankOrder, setBankOrder] = useState(() => shuffleWords(exercises[0].words))
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const current = exercises[index]

  const availableSlots = bankOrder.filter((wordIdx) => !picked.includes(wordIdx))

  function pick(wordIdx) {
    if (checked) return
    setPicked((p) => [...p, wordIdx])
  }

  function unpick(pos) {
    if (checked) return
    setPicked((p) => p.filter((_, i) => i !== pos))
  }

  function check() {
    setChecked(true)
    const isCorrect = JSON.stringify(picked) === JSON.stringify(current.correctOrder)
    if (isCorrect) setCorrectCount((c) => c + 1)
  }

  function next() {
    if (index + 1 >= exercises.length) {
      onComplete({ correct: correctCount, total: exercises.length })
      return
    }
    const nextIndex = index + 1
    setIndex(nextIndex)
    setPicked([])
    setBankOrder(shuffleWords(exercises[nextIndex].words))
    setChecked(false)
  }

  const isCorrect = checked && JSON.stringify(picked) === JSON.stringify(current.correctOrder)

  return (
    <div>
      <h3 className="font-display font-bold text-lg text-alp-900 mb-1">Construye la oración</h3>
      <p className="text-sm text-alp-600 mb-4">{current.prompt[interfaceLang] ?? current.prompt.es}</p>

      <div className="min-h-[3.5rem] border-b-2 border-alp-200 flex flex-wrap gap-2 items-center p-2 mb-4">
        {picked.length === 0 && <span className="text-alp-300 text-sm">Toca las palabras en orden...</span>}
        {picked.map((wordIdx, pos) => (
          <motion.button
            layout
            key={`${wordIdx}-${pos}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => unpick(pos)}
            className="px-3 py-1.5 rounded-lg bg-swiss-red/10 text-swiss-red font-semibold text-sm"
          >
            {current.words[wordIdx]}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {availableSlots.map((wordIdx) => (
          <motion.button
            layout
            key={wordIdx}
            whileTap={{ scale: 0.95 }}
            onClick={() => pick(wordIdx)}
            className="px-3 py-1.5 rounded-lg bg-alp-100 hover:bg-alp-200 text-alp-800 font-semibold text-sm"
          >
            {current.words[wordIdx]}
          </motion.button>
        ))}
      </div>

      {!checked ? (
        <Button onClick={check} disabled={picked.length !== current.words.length} className="w-full">
          {t('checkAnswer')}
        </Button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
            {isCorrect ? t('correct') : t('incorrect')}
          </p>
          {!isCorrect && (
            <p className="text-sm text-alp-500 mb-3">
              Respuesta correcta: <span className="font-semibold text-alp-700">{joinSentence(current.correctOrder.map((i) => current.words[i]))}</span>
            </p>
          )}
          <Button onClick={next} className="w-full">
            {t('continue')}
          </Button>
        </motion.div>
      )}
    </div>
  )
}
