import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { Button } from '../ui/Button.jsx'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

/**
 * Módulo "escuchar audio": se reproduce el audio (Web Speech API, voz de-DE
 * como mejor sustituto del dialecto) y el usuario elige la traducción
 * correcta entre varias opciones.
 */
export function ExerciseListening({ vocabulary, distractorPool, onComplete }) {
  const { interfaceLang, t } = useLanguage()
  const { speak, isSpeaking, supportsSynthesis } = useSpeech()

  // `distractorPool` permite sacar las opciones incorrectas de un conjunto
  // más amplio que lo que realmente se pregunta (p. ej. toda la lección,
  // aunque esta ronda solo trate un trocito de 2-3 palabras) — así las
  // opciones no se repiten idénticas entre rondas de un mismo bloque.
  const rounds = useMemo(() => {
    const pool = vocabulary.slice(0, 6)
    const candidates = distractorPool ?? vocabulary
    return pool.map((item) => {
      const distractors = shuffle(candidates.filter((v) => v.id !== item.id)).slice(0, 2)
      const options = shuffle([item, ...distractors])
      return { item, options }
    })
  }, [vocabulary, distractorPool])

  const [roundIndex, setRoundIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [answered, setAnswered] = useState(false)

  const round = rounds[roundIndex]

  function handleSelect(optionId) {
    if (answered) return
    setSelected(optionId)
    setAnswered(true)
    if (optionId === round.item.id) setCorrectCount((c) => c + 1)
  }

  function next() {
    if (roundIndex + 1 >= rounds.length) {
      onComplete({ correct: correctCount, total: rounds.length })
    } else {
      setRoundIndex((i) => i + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const isCorrect = selected === round.item.id

  return (
    <div>
      <h3 className="font-display font-bold text-lg text-alp-900 dark:text-alp-50 mb-1">{t('listen')}</h3>
      <p className="text-sm text-alp-500 dark:text-alp-300 mb-4">
        Ronda {roundIndex + 1} de {rounds.length}
      </p>

      <div className="flex flex-col items-center gap-4 mb-6">
        <motion.button
          onClick={() => speak(round.item.audioText, { lang: 'de-DE' })}
          whileTap={{ scale: 0.92 }}
          animate={isSpeaking ? { scale: [1, 1.08, 1] } : {}}
          transition={{ repeat: isSpeaking ? Infinity : 0, duration: 0.6 }}
          className="w-20 h-20 rounded-full bg-alp-800 text-white flex items-center justify-center shadow-card"
          disabled={!supportsSynthesis}
        >
          <Volume2 size={32} />
        </motion.button>
        {!supportsSynthesis && (
          <p className="text-xs text-alp-400">Tu navegador no soporta síntesis de voz.</p>
        )}
      </div>

      <div className="grid gap-2">
        {round.options.map((opt) => {
          const label = opt.base[interfaceLang] ?? opt.base.es
          const isThisSelected = selected === opt.id
          let style = 'bg-white dark:bg-alp-900 border-alp-300 dark:border-alp-600 text-alp-800 dark:text-alp-100 hover:border-swiss-red/40'
          if (answered && opt.id === round.item.id) style = 'bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300'
          else if (answered && isThisSelected) style = 'bg-red-100 border-red-400 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300'

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`p-3 rounded-xl border-2 text-left font-medium transition-colors ${style}`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {answered && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
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
