import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, ChevronLeft, ChevronRight, ListChecks } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { TRAVEL_PHRASES } from '../../data/travelPhrases.js'
import { buildVocabQuizQuestions } from '../../data/practicePool.js'
import { ExerciseMultipleChoice } from '../lesson/ExerciseMultipleChoice.jsx'
import { Card } from '../ui/Card.jsx'
import { Button } from '../ui/Button.jsx'

const CATEGORY_EMOJI = {
  train: '🚉',
  help: '🙋',
  understanding: '🤔',
  pharmacy: '💊',
  money: '💰',
  courtesy: '🙏',
  directions: '🚻',
}

/**
 * Mazo breve y autocontenido de frases de supervivencia para moverte por
 * Suiza (estación, farmacia, precios, pedir ayuda...) — no forma parte del
 * temario CEFR, es un extra ligero de consulta y práctica rápida, al
 * estilo de los mini-mazos de frases que muchas apps de idiomas ofrecen
 * junto a su temario principal.
 */
export function TravelPhrasesDeck() {
  const { interfaceLang, t } = useLanguage()
  const { registerActivityToday, addXp } = useUserProgress()
  const { speak, supportsSynthesis } = useSpeech()
  const [mode, setMode] = useState('cards') // 'cards' | 'quiz'
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [quizResult, setQuizResult] = useState(null)

  const phrase = TRAVEL_PHRASES[index]

  function go(delta) {
    setFlipped(false)
    setIndex((i) => (i + delta + TRAVEL_PHRASES.length) % TRAVEL_PHRASES.length)
  }

  function finishQuiz(result) {
    registerActivityToday()
    addXp(3)
    setQuizResult(result)
  }

  if (mode === 'quiz') {
    if (quizResult) {
      return (
        <Card className="text-center card-accent-meadow">
          <p className="font-display font-bold text-lg text-alp-900 dark:text-alp-50 mb-1">{t('travelQuizDoneTitle')}</p>
          <p className="text-alp-600 dark:text-alp-300 mb-4">
            {quizResult.correct}/{quizResult.total}
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setMode('cards')
                setQuizResult(null)
              }}
              className="flex-1"
            >
              {t('travelBackToCards')}
            </Button>
            <Button onClick={() => setQuizResult(null)} className="flex-1">
              {t('continue')}
            </Button>
          </div>
        </Card>
      )
    }
    return (
      <Card>
        <ExerciseMultipleChoice
          questions={buildVocabQuizQuestions(TRAVEL_PHRASES, interfaceLang)}
          title={t('travelQuizTitle')}
          onComplete={finishQuiz}
        />
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      <div>
        <h4 className="font-display font-bold text-alp-900 dark:text-alp-50">{t('travelDeckTitle')}</h4>
        <p className="text-sm text-alp-500 dark:text-alp-300">{t('travelDeckSubtitle')}</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-alp-500 dark:text-alp-300">
          {index + 1} / {TRAVEL_PHRASES.length}
        </p>
        <button
          onClick={() => setMode('quiz')}
          className="flex items-center gap-1.5 text-sm font-semibold text-swiss-red hover:underline"
        >
          <ListChecks size={15} /> {t('travelTryQuiz')}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
        >
          <Card
            onClick={() => setFlipped((f) => !f)}
            className="cursor-pointer min-h-[11rem] flex flex-col items-center justify-center text-center gap-2 card-accent-wood"
          >
            <span className="text-3xl mb-1">{CATEGORY_EMOJI[phrase.category] ?? '🧳'}</span>
            {!flipped ? (
              <>
                <p className="font-display font-bold text-xl text-alp-900 dark:text-alp-50">{phrase.schwiizerduetsch}</p>
                <p className="text-xs text-alp-400 dark:text-alp-500">{t('travelFlipHint')}</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-alp-800 dark:text-alp-100">{phrase.base[interfaceLang] ?? phrase.base.es}</p>
                <p className="text-xs text-alp-500 dark:text-alp-400">{phrase.hochdeutsch}</p>
              </>
            )}
            {supportsSynthesis && (
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation()
                  speak(phrase.audioText, { lang: 'de-DE' })
                }}
                className="mt-1 text-alp-500 hover:text-swiss-red"
              >
                <Volume2 size={18} />
              </span>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          onClick={() => go(-1)}
          className="nav-item p-2 rounded-full hover:bg-alp-100 dark:hover:bg-alp-700 text-alp-600 dark:text-alp-300 min-h-[44px] min-w-[44px]"
          aria-label={t('previous')}
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-1">
          {TRAVEL_PHRASES.map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === index ? 'bg-swiss-red' : 'bg-alp-200 dark:bg-alp-600'}`} />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="nav-item p-2 rounded-full hover:bg-alp-100 dark:hover:bg-alp-700 text-alp-600 dark:text-alp-300 min-h-[44px] min-w-[44px]"
          aria-label={t('next')}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
