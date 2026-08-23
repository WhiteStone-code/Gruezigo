import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { Button } from '../ui/Button.jsx'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

/**
 * Paso "FILL_IN_BLANKS": completa el hueco de una frase en Schwiizerdütsch
 * tocando la palabra correcta de un banco de opciones (en vez de texto
 * libre — evita el problema de comparar tildes/mayúsculas de escritura a
 * mano en el móvil, pero sigue exigiendo aplicar la regla aprendida, no
 * solo reconocerla pasivamente).
 *
 * Forma de los datos (exercises: FillBlanksExercise[]):
 * { id, before, after, correctWord, options: string[], hint: {7 idiomas} }
 */
export function ExerciseFillBlanks({ exercises, onComplete }) {
  const { interfaceLang, t } = useLanguage()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const current = exercises[index]
  const shuffledOptions = useMemo(() => shuffle(current.options), [current])

  function pick(word) {
    if (checked) return
    setSelected(word)
  }

  function check() {
    setChecked(true)
    if (selected === current.correctWord) setCorrectCount((c) => c + 1)
  }

  function next() {
    if (index + 1 >= exercises.length) {
      onComplete({ correct: correctCount, total: exercises.length })
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setChecked(false)
  }

  const isCorrect = checked && selected === current.correctWord

  return (
    <div>
      <h3 className="font-display font-bold text-lg text-alp-900 dark:text-alp-50 mb-1">Completa la frase</h3>
      <p className="text-sm text-alp-500 dark:text-alp-300 mb-4">{current.hint[interfaceLang] ?? current.hint.es}</p>

      <div className="card bg-alp-50 dark:bg-alp-900 text-center mb-6">
        <p className="font-display font-bold text-lg text-alp-900 dark:text-alp-50">
          {current.before}{' '}
          <span
            className={`inline-block min-w-[4rem] px-2 border-b-2 ${
              checked
                ? isCorrect
                  ? 'border-green-500 text-green-600'
                  : 'border-red-400 text-red-500'
                : 'border-swiss-red text-swiss-red'
            }`}
          >
            {selected ?? '____'}
          </span>{' '}
          {current.after}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {shuffledOptions.map((opt) => {
          const isPicked = selected === opt
          let style = 'bg-white dark:bg-alp-900 border-alp-300 dark:border-alp-600 text-alp-800 dark:text-alp-100 hover:border-swiss-red/40'
          if (checked && opt === current.correctWord) style = 'bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300'
          else if (checked && isPicked) style = 'bg-red-100 border-red-400 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300'
          else if (isPicked) style = 'bg-sky-100 border-sky-400 text-sky-700 dark:bg-sky-900/30 dark:border-sky-500 dark:text-sky-300'

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              onClick={() => pick(opt)}
              className={`px-4 py-2 rounded-xl border-2 font-semibold text-sm transition-colors ${style}`}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>

      {!checked ? (
        <Button onClick={check} disabled={!selected} className="w-full">
          {t('checkAnswer')}
        </Button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <p className={`font-semibold mb-3 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
            {isCorrect ? t('correct') : `${t('incorrect')} — era "${current.correctWord}"`}
          </p>
          <Button onClick={next} className="w-full">
            {t('continue')}
          </Button>
        </motion.div>
      )}
    </div>
  )
}
