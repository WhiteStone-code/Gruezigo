import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PartyPopper, Award, Flame } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { LessonProgressBar } from './LessonProgressBar.jsx'
import { ExampleDialogue } from './ExampleDialogue.jsx'
import { ComparisonTable } from './ComparisonTable.jsx'
import { ExerciseMatchVocabulary } from './ExerciseMatchVocabulary.jsx'
import { ExerciseListening } from './ExerciseListening.jsx'
import { ExerciseSentenceBuilder } from './ExerciseSentenceBuilder.jsx'
import { ExerciseSpeaking } from './ExerciseSpeaking.jsx'
import { ExerciseMultipleChoice } from './ExerciseMultipleChoice.jsx'
import { Button } from '../ui/Button.jsx'
import { Card } from '../ui/Card.jsx'

const XP_PER_LESSON = 20
const XP_PER_EXAM_PASS = 15

/**
 * Componente principal de la lección interactiva de GrüeziGo.
 *
 * Orquesta, en un único flujo tipo otra app de idiomas, todos los módulos pedidos:
 *   1. Comparación Hochdeutsch vs. Schwiizerdütsch (momento de aprendizaje)
 *   2. Emparejar vocabulario
 *   3. Escuchar audio (Web Speech API — síntesis)
 *   4. Construcción de oraciones
 *   5. Práctica de pronunciación (Web Speech API — reconocimiento)
 *   6. Opción múltiple
 *   7. Examen final del módulo (10 preguntas, sin límite de tiempo)
 *   8. Pantalla de finalización (XP, racha, y acceso al certificado)
 *
 * Recibe el objeto `lesson` ya parseado desde src/data/lessons/**.json.
 */
export function LessonView({ lesson, onExit, onRequestCertificate }) {
  const { t } = useLanguage()
  const { completeLesson, addXp, registerActivityToday, unlockBadge, progress } = useUserProgress()

  // Construye la secuencia de pasos a partir del contenido de la lección.
  // Cada paso es {type, key, render}. Esto hace trivial añadir/quitar
  // módulos por lección sin tocar el resto del componente.
  const steps = useMemo(() => {
    const list = []
    lesson.dialogueExample?.length && list.push({ type: 'example' })
    list.push({ type: 'comparison' }, { type: 'match' }, { type: 'listening' })
    lesson.exercises.sentenceBuilder?.length && list.push({ type: 'sentence' })
    lesson.exercises.pronunciation?.length && list.push({ type: 'speaking' })
    lesson.exercises.multipleChoice?.length && list.push({ type: 'multipleChoice' })
    lesson.finalExam?.length && list.push({ type: 'exam' })
    list.push({ type: 'complete' })
    return list
  }, [lesson])

  const [stepIndex, setStepIndex] = useState(0)
  const [stats, setStats] = useState({ correct: 0, total: 0 })
  const [examPassed, setExamPassed] = useState(null)

  const step = steps[stepIndex]
  const progressRatio = stepIndex / (steps.length - 1)

  function advance(result) {
    if (result) {
      setStats((s) => ({ correct: s.correct + result.correct, total: s.total + result.total }))
    }
    setStepIndex((i) => Math.min(i + 1, steps.length - 1))
  }

  function handleExamComplete(result) {
    const passed = result.correct / result.total >= 0.6
    setExamPassed(passed)
    advance(result)
  }

  function finishLesson() {
    completeLesson(lesson.id, stats)
    registerActivityToday()
    addXp(XP_PER_LESSON + (examPassed ? XP_PER_EXAM_PASS : 0))
    if (progress.streak.current + 1 === 7) unlockBadge('racha-7')
    if (progress.streak.current + 1 === 30) unlockBadge('racha-30')
    onExit?.({ completed: true, stats })
  }

  return (
    <div className="max-w-xl mx-auto px-4 pb-10">
      {step.type !== 'complete' && (
        <LessonProgressBar progress={progressRatio} onExit={() => onExit?.({ completed: false })} />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          {step.type === 'example' && <ExampleDialogue lesson={lesson} onContinue={() => advance()} />}

          {step.type === 'comparison' && <ComparisonTable lesson={lesson} onContinue={() => advance()} />}

          {step.type === 'match' && (
            <Card>
              <ExerciseMatchVocabulary vocabulary={lesson.vocabulary} onComplete={advance} />
            </Card>
          )}

          {step.type === 'listening' && (
            <Card>
              <ExerciseListening vocabulary={lesson.vocabulary} onComplete={advance} />
            </Card>
          )}

          {step.type === 'sentence' && (
            <Card>
              <ExerciseSentenceBuilder exercises={lesson.exercises.sentenceBuilder} onComplete={advance} />
            </Card>
          )}

          {step.type === 'speaking' && (
            <Card>
              <ExerciseSpeaking exercises={lesson.exercises.pronunciation} onComplete={advance} />
            </Card>
          )}

          {step.type === 'multipleChoice' && (
            <Card>
              <ExerciseMultipleChoice
                questions={lesson.exercises.multipleChoice}
                title="Opción múltiple"
                onComplete={advance}
              />
            </Card>
          )}

          {step.type === 'exam' && (
            <Card>
              <ExerciseMultipleChoice
                questions={lesson.finalExam}
                title="Examen final del módulo"
                onComplete={handleExamComplete}
              />
            </Card>
          )}

          {step.type === 'complete' && (
            <LessonComplete
              lesson={lesson}
              stats={stats}
              examPassed={examPassed}
              xpEarned={XP_PER_LESSON + (examPassed ? XP_PER_EXAM_PASS : 0)}
              streak={progress.streak.current + 1}
              onFinish={finishLesson}
              onRequestCertificate={onRequestCertificate}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function LessonComplete({ lesson, stats, examPassed, xpEarned, streak, onFinish, onRequestCertificate }) {
  const { interfaceLang } = useLanguage()
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 100

  return (
    <div className="text-center py-6">
      <motion.div
        initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="w-24 h-24 mx-auto rounded-full bg-cheese-100 flex items-center justify-center mb-4"
      >
        <PartyPopper size={44} className="text-cheese-600" />
      </motion.div>

      <h2 className="font-display font-bold text-2xl text-alp-900 mb-1">¡Lección completada!</h2>
      <p className="text-alp-500 mb-6">{lesson.title[interfaceLang] ?? lesson.title.es}</p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="!p-3">
          <p className="text-2xl font-display font-bold text-swiss-red">+{xpEarned}</p>
          <p className="text-xs text-alp-500">XP</p>
        </Card>
        <Card className="!p-3">
          <p className="text-2xl font-display font-bold text-alp-800">{accuracy}%</p>
          <p className="text-xs text-alp-500">Precisión</p>
        </Card>
        <Card className="!p-3 flex flex-col items-center">
          <p className="text-2xl font-display font-bold text-cheese-600 flex items-center gap-1">
            <Flame size={20} /> {streak}
          </p>
          <p className="text-xs text-alp-500">Racha</p>
        </Card>
      </div>

      {examPassed !== null && (
        <div className={`flex items-center justify-center gap-2 mb-6 font-semibold ${examPassed ? 'text-green-600' : 'text-amber-600'}`}>
          <Award size={18} />
          {examPassed ? 'Examen del módulo aprobado' : 'Examen no superado — puedes repetir la lección'}
        </div>
      )}

      <div className="space-y-2">
        <Button onClick={onFinish} className="w-full">
          Continuar
        </Button>
        {onRequestCertificate && (
          <Button variant="secondary" onClick={onRequestCertificate} className="w-full">
            Ver progreso hacia mi certificado
          </Button>
        )}
      </div>
    </div>
  )
}
