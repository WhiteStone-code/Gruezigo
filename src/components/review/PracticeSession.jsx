import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PartyPopper, Shuffle, Headphones, Mic, ListChecks } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { getPracticeSources, pickPracticeWords, buildVocabQuizQuestions, buildPronunciationExercises } from '../../data/practicePool.js'
import { ExerciseMatchVocabulary } from '../lesson/ExerciseMatchVocabulary.jsx'
import { ExerciseListening } from '../lesson/ExerciseListening.jsx'
import { ExerciseSpeaking } from '../lesson/ExerciseSpeaking.jsx'
import { ExerciseMultipleChoice } from '../lesson/ExerciseMultipleChoice.jsx'
import { Card } from '../ui/Card.jsx'
import { Button } from '../ui/Button.jsx'
import { PronunciationTips } from './PronunciationTips.jsx'

const MODES = [
  { id: 'match', label: 'Emparejar', icon: Shuffle, accent: 'sky' },
  { id: 'listening', label: 'Escuchar', icon: Headphones, accent: 'alp' },
  { id: 'speaking', label: 'Pronunciación', icon: Mic, accent: 'cheese' },
  { id: 'quiz', label: 'Opción múltiple', icon: ListChecks, accent: 'meadow' },
]

/**
 * Sesión de práctica libre para el Repaso: elige una fuente (una lección, un
 * tema de vocabulario, o "todo mezclado") y un formato, y reutiliza los
 * mismos componentes de ejercicio que las lecciones — nada nuevo que
 * mantener por duplicado.
 */
export function PracticeSession() {
  const { interfaceLang } = useLanguage()
  const { registerActivityToday, addXp } = useUserProgress()
  const sources = useMemo(() => getPracticeSources(), [])
  const [sourceId, setSourceId] = useState('all')
  const [mode, setMode] = useState(null)
  const [session, setSession] = useState(null) // { words, result: null }

  function start() {
    const words = pickPracticeWords(sourceId, 8)
    setSession({ words, result: null })
  }

  function finishSession(result) {
    // Una sesión de práctica también cuenta como "actividad de hoy" para la
    // racha y el calendario de actividad — no hace falta completar una
    // lección entera para que el día quede marcado.
    registerActivityToday()
    addXp(5)
    setSession((s) => ({ ...s, result }))
  }

  function reset() {
    setSession(null)
    setMode(null)
  }

  if (session?.result) {
    const pct = session.result.total > 0 ? Math.round((session.result.correct / session.result.total) * 100) : 100
    return (
      <Card className="text-center card-accent-meadow">
        <PartyPopper size={36} className="mx-auto text-meadow-500 mb-2" />
        <h3 className="font-display font-bold text-xl text-alp-900 dark:text-alp-50 mb-1">¡Sesión terminada!</h3>
        <p className="text-alp-600 dark:text-alp-300 mb-4">
          {session.result.correct}/{session.result.total} correctas ({pct}%)
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={reset} className="flex-1">
            Elegir otra
          </Button>
          <Button onClick={start} className="flex-1">
            Repetir
          </Button>
        </div>
      </Card>
    )
  }

  if (session && mode) {
    if (mode === 'match') return <Card><ExerciseMatchVocabulary vocabulary={session.words} onComplete={finishSession} /></Card>
    if (mode === 'listening') return <Card><ExerciseListening vocabulary={session.words} onComplete={finishSession} /></Card>
    if (mode === 'speaking')
      return (
        <Card>
          <ExerciseSpeaking exercises={buildPronunciationExercises(session.words)} onComplete={finishSession} />
        </Card>
      )
    if (mode === 'quiz')
      return (
        <Card>
          <ExerciseMultipleChoice
            questions={buildVocabQuizQuestions(session.words, interfaceLang)}
            title="Opción múltiple"
            onComplete={finishSession}
          />
        </Card>
      )
  }

  return (
    <div className="space-y-4">
      <PronunciationTips />

      <Card className="card-accent-sky">
        <h4 className="font-display font-bold text-alp-900 dark:text-alp-50 mb-2">1. Elige qué practicar</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSourceId('all')}
            className={`nav-item px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors
              ${sourceId === 'all' ? 'bg-swiss-red text-white border-swiss-red' : 'bg-white dark:bg-alp-900 text-alp-700 dark:text-alp-200 border-alp-300 dark:border-alp-600'}`}
          >
            🎲 Todo mezclado
          </button>
          {sources.map((s) => (
            <button
              key={s.id}
              onClick={() => setSourceId(s.id)}
              className={`nav-item px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors
                ${sourceId === s.id ? 'bg-swiss-red text-white border-swiss-red' : 'bg-white dark:bg-alp-900 text-alp-700 dark:text-alp-200 border-alp-300 dark:border-alp-600'}`}
            >
              {s.icon ?? '📘'} {s.title[interfaceLang] ?? s.title.es}
            </button>
          ))}
        </div>
      </Card>

      <Card className="card-accent-cheese">
        <h4 className="font-display font-bold text-alp-900 dark:text-alp-50 mb-2">2. Elige el formato</h4>
        <div className="grid grid-cols-2 gap-2">
          {MODES.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setMode(id)}
              className={`nav-item flex flex-col items-center gap-1 p-3 rounded-xl border text-sm font-semibold transition-colors
                ${mode === id ? 'bg-swiss-red text-white border-swiss-red' : 'bg-white dark:bg-alp-900 text-alp-700 dark:text-alp-200 border-alp-300 dark:border-alp-600'}`}
            >
              <Icon size={20} />
              {label}
            </motion.button>
          ))}
        </div>
      </Card>

      <Button onClick={start} disabled={!mode} className="w-full">
        Empezar sesión
      </Button>
    </div>
  )
}
