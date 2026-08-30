import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkle, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { pickPracticeWords, buildVocabQuizQuestions } from '../../data/practicePool.js'
import { ExerciseMultipleChoice } from '../lesson/ExerciseMultipleChoice.jsx'
import { Card } from '../ui/Card.jsx'
import { Button } from '../ui/Button.jsx'

const WARMUP_WORD_COUNT = 5
const AWAY_THRESHOLD_DAYS = 2 // se ofrece a partir de un día entero de ausencia

function daysSince(dateStr) {
  if (!dateStr) return null
  const startOfToday = new Date().setHours(0, 0, 0, 0)
  const then = new Date(dateStr).setHours(0, 0, 0, 0)
  return Math.round((startOfToday - then) / 86400000)
}

/**
 * Empujoncito opcional al volver tras un descanso: antes de retomar la
 * siguiente lección, se ofrece un mini-quiz de unas pocas palabras (al
 * estilo del "repaso rápido" que muchas apps de hábitos o idiomas sugieren
 * antes de continuar) — nunca bloquea el botón "Continuar" del Dashboard,
 * siempre se puede saltar con un toque.
 */
export function WarmupPrompt() {
  const { interfaceLang, t } = useLanguage()
  const { progress, registerActivityToday, addXp } = useUserProgress()
  const [dismissed, setDismissed] = useState(false)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(null)

  const questions = useMemo(() => {
    const words = pickPracticeWords('all', WARMUP_WORD_COUNT)
    return words.length ? buildVocabQuizQuestions(words, interfaceLang) : []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasPriorActivity = progress.completedLessons.length > 0 || (progress.activityLog?.length ?? 0) > 0
  const gap = daysSince(progress.streak.lastActiveDate)
  const shouldOffer = hasPriorActivity && gap !== null && gap >= AWAY_THRESHOLD_DAYS && questions.length >= 3

  if (!shouldOffer || dismissed) return null

  function finish(result) {
    registerActivityToday()
    addXp(3)
    setDone(result)
  }

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
        <Card className="card-accent-meadow">
          {!started && !done && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-meadow-100 dark:bg-meadow-900/40 flex items-center justify-center shrink-0">
                <Sparkle size={18} className="text-meadow-600 dark:text-meadow-300" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-alp-900 dark:text-alp-50">{t('warmupTitle')}</p>
                <p className="text-sm text-alp-600 dark:text-alp-300 mb-2">
                  {t('warmupBody', { count: questions.length })}
                </p>
                <div className="flex items-center gap-3">
                  <Button onClick={() => setStarted(true)} className="!py-1.5 !px-3 text-sm">
                    {t('warmupStart')}
                  </Button>
                  <button
                    onClick={() => setDismissed(true)}
                    className="text-sm font-semibold text-alp-500 hover:text-alp-700 dark:hover:text-alp-200"
                  >
                    {t('warmupSkip')}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setDismissed(true)}
                aria-label={t('close')}
                className="nav-item text-alp-400 hover:text-alp-600 dark:hover:text-alp-200 shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {started && !done && (
            <ExerciseMultipleChoice questions={questions} title={t('warmupTitle')} onComplete={finish} />
          )}

          {done && (
            <div className="text-center py-2">
              <p className="font-semibold text-alp-900 dark:text-alp-50 mb-2">
                {t('warmupDone', { correct: done.correct, total: done.total })}
              </p>
              <button onClick={() => setDismissed(true)} className="text-sm font-semibold text-swiss-red hover:underline">
                {t('continue')}
              </button>
            </div>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
