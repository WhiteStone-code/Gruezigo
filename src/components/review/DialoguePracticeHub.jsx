import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { getAllLessonsInOrder } from '../../data/lessons/index.js'
import { DialogueSimulation } from '../lesson/DialogueSimulation.jsx'
import { Card } from '../ui/Card.jsx'
import { Button } from '../ui/Button.jsx'
import { EmptyState } from '../ui/EmptyState.jsx'

/**
 * Repite, fuera de cualquier lección, las simulaciones de conversación que
 * ya aparecieron en lecciones COMPLETADAS — reutiliza <DialogueSimulation/>
 * tal cual (la misma pieza que usa LessonView), solo que aquí se elige cuál
 * repetir y no hace falta rehacer la lección entera para practicar de
 * nuevo la conversación.
 */
export function DialoguePracticeHub() {
  const { interfaceLang, t } = useLanguage()
  const { progress, registerActivityToday, addXp } = useUserProgress()
  const [active, setActive] = useState(null) // { key, lessonTitle, simulation }
  const [result, setResult] = useState(null)

  const entries = useMemo(() => {
    const doneIds = new Set(progress.completedLessons)
    return getAllLessonsInOrder()
      .filter((lesson) => doneIds.has(lesson.id) && lesson.dialogueSimulations?.length)
      .flatMap((lesson) =>
        lesson.dialogueSimulations.map((sim, i) => ({
          key: `${lesson.id}-${sim.id ?? i}`,
          lessonTitle: lesson.title,
          simulation: sim,
        }))
      )
  }, [progress.completedLessons])

  function finishSimulation(res) {
    registerActivityToday()
    addXp(3)
    setResult(res)
  }

  function backToList() {
    setActive(null)
    setResult(null)
  }

  if (active) {
    return (
      <div className="space-y-3">
        <button
          onClick={backToList}
          className="nav-item flex items-center gap-1.5 text-sm font-semibold text-alp-500 hover:text-swiss-red dark:text-alp-300"
        >
          <ArrowLeft size={16} /> {t('backToList')}
        </button>
        <Card>
          {!result ? (
            <DialogueSimulation simulation={active.simulation} onComplete={finishSimulation} />
          ) : (
            <div className="text-center py-4">
              <p className="font-display font-bold text-lg text-alp-900 dark:text-alp-50 mb-1">
                {t('dialoguePracticeDoneTitle')}
              </p>
              <p className="text-alp-600 dark:text-alp-300 mb-4">
                {result.correct}/{result.total}
              </p>
              <Button onClick={backToList} className="w-full">
                {t('backToList')}
              </Button>
            </div>
          )}
        </Card>
      </div>
    )
  }

  if (!entries.length) {
    return (
      <EmptyState
        icon="💬"
        title={t('dialoguePracticeEmptyTitle')}
        description={t('dialoguePracticeEmptyDescription')}
      />
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-alp-500 dark:text-alp-300">{t('dialoguePracticeSubtitle')}</p>
      {entries.map((entry) => (
        <motion.button
          key={entry.key}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setActive(entry)
            setResult(null)
          }}
          className="w-full nav-item"
        >
          <Card className="flex items-center gap-3 text-left hover:shadow-card-lg transition-shadow">
            <div className="w-10 h-10 rounded-full bg-swiss-red/10 dark:bg-swiss-red/20 flex items-center justify-center shrink-0 text-xl">
              {entry.simulation.npcEmoji ?? '💬'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-alp-900 dark:text-alp-50 text-sm truncate">
                {entry.simulation.scenario?.[interfaceLang] ?? entry.simulation.scenario?.es}
              </p>
              <p className="text-xs text-alp-500 dark:text-alp-400 truncate">
                {entry.lessonTitle[interfaceLang] ?? entry.lessonTitle.es}
              </p>
            </div>
            <MessageCircle size={18} className="text-alp-300 shrink-0" />
          </Card>
        </motion.button>
      ))}
    </div>
  )
}
