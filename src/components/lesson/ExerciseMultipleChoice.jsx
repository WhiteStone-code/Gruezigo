import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { Button } from '../ui/Button.jsx'

// Las opciones pueden ser una palabra en alemán/dialecto (string, sin
// traducir a propósito porque es la lengua meta) o un objeto multilingüe
// cuando la opción es un concepto que sí necesita traducirse.
function resolveText(value, lang) {
  if (typeof value === 'string') return value
  return value?.[lang] ?? value?.es ?? ''
}

/**
 * Módulo genérico de opción múltiple. Sirve tanto para los ejercicios
 * cortos de cada lección como para el examen final de 10 preguntas.
 */
export function ExerciseMultipleChoice({ questions, title, onComplete }) {
  const { interfaceLang, t } = useLanguage()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const current = questions[index]

  function handleSelect(optIndex) {
    if (answered) return
    setSelected(optIndex)
    setAnswered(true)
    if (current.options[optIndex].correct) setCorrectCount((c) => c + 1)
  }

  function next() {
    if (index + 1 >= questions.length) {
      onComplete({ correct: correctCount, total: questions.length })
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setAnswered(false)
  }

  const isCorrect = answered && current.options[selected]?.correct

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display font-bold text-lg text-alp-900 dark:text-alp-50">{title}</h3>
        <span className="text-xs font-semibold text-alp-500">
          {index + 1} / {questions.length}
        </span>
      </div>
      <p className="text-alp-700 dark:text-alp-200 mb-4">{resolveText(current.question, interfaceLang)}</p>

      <div className="grid gap-2 mb-4">
        {current.options.map((opt, i) => {
          const label = resolveText(opt.text, interfaceLang)
          let style = 'bg-white dark:bg-alp-900 border-alp-300 dark:border-alp-600 text-alp-800 dark:text-alp-100 hover:border-swiss-red/40'
          if (answered && opt.correct) style = 'bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300'
          else if (answered && i === selected) style = 'bg-red-100 border-red-400 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300'

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-3 rounded-xl border-2 text-left font-medium transition-colors ${style}`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {answered && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <p className={`font-semibold mb-3 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
            {isCorrect ? t('correct') : t('incorrect')}
          </p>
          <Button onClick={next} className="w-full">
            {t('continue')}
          </Button>
        </motion.div>
      )}
    </div>
  )
}
