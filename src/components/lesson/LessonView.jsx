import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PartyPopper, Award, Flame } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { LessonProgressBar } from './LessonProgressBar.jsx'
import { ExampleDialogue } from './ExampleDialogue.jsx'
import { VocabIntroCard } from './VocabIntroCard.jsx'
import { LessonPartBreak } from './LessonPartBreak.jsx'
import { ExerciseMatchVocabulary } from './ExerciseMatchVocabulary.jsx'
import { ExerciseListening } from './ExerciseListening.jsx'
import { ExerciseSentenceBuilder } from './ExerciseSentenceBuilder.jsx'
import { ExerciseSpeaking } from './ExerciseSpeaking.jsx'
import { ExerciseMultipleChoice } from './ExerciseMultipleChoice.jsx'
import { Button } from '../ui/Button.jsx'
import { Card } from '../ui/Card.jsx'

const XP_PER_LESSON = 20
const XP_PER_EXAM_PASS = 15
const CHUNK_SIZE = 2
const FORMAT_CYCLE = ['match', 'listening']

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

/**
 * Componente principal de la lección interactiva de GrüeziGo.
 *
 * Estructura por bloques (inspirada en cómo una app de idiomas reparte una lección en
 * 3-4 mini-lecciones sobre el mismo vocabulario, en vez de arrastrar todas
 * las palabras por un ejercicio entero antes de pasar al siguiente):
 *   1. Diálogo de ejemplo (contexto real antes de nada)
 *   2. Por cada bloque de 2 palabras: tarjetas + UN ejercicio de práctica
 *      (alterna emparejar/escuchar), con una pausa "Parte X de Y" cada 2
 *      bloques
 *   3. Construcción de oraciones (si la lección la trae)
 *   4. Pronunciación (si la trae — con botón "Saltar" siempre disponible)
 *   5. Un único examen final, recortado al tamaño de la lección (no tres
 *      cuestionarios seguidos sobre las mismas palabras)
 *   6. Pantalla de finalización (XP, racha, certificado)
 *
 * Recibe el objeto `lesson` ya parseado desde src/data/lessons/**.json.
 */
export function LessonView({ lesson, onExit, onRequestCertificate }) {
  const { t, interfaceLang } = useLanguage()
  const { completeLesson, addXp, registerActivityToday, unlockBadge, progress } = useUserProgress()

  const vocabChunks = useMemo(() => chunk(lesson.vocabulary, CHUNK_SIZE), [lesson])
  const shortExam = useMemo(() => {
    if (!lesson.finalExam?.length) return []
    const size = Math.min(lesson.finalExam.length, Math.max(4, Math.ceil(lesson.vocabulary.length * 1.5)))
    return lesson.finalExam.slice(0, size)
  }, [lesson])

  const steps = useMemo(() => {
    const list = []
    lesson.dialogueExample?.length && list.push({ type: 'example' })

    vocabChunks.forEach((words, i) => {
      list.push({ type: 'intro', words, partLabel: `Bloque ${i + 1} de ${vocabChunks.length}` })
      list.push({ type: FORMAT_CYCLE[i % FORMAT_CYCLE.length], words })
      // Pausa breve cada 2 bloques, salvo justo al final de la lección.
      if ((i + 1) % 2 === 0 && i + 1 < vocabChunks.length) {
        list.push({ type: 'partBreak', partNumber: Math.ceil((i + 1) / 2), totalParts: Math.ceil(vocabChunks.length / 2) })
      }
    })

    lesson.exercises.sentenceBuilder?.length && list.push({ type: 'sentence' })
    lesson.exercises.pronunciation?.length && list.push({ type: 'speaking' })
    shortExam.length && list.push({ type: 'exam' })
    list.push({ type: 'complete' })
    return list
  }, [lesson, vocabChunks, shortExam])

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

      {/* Sin AnimatePresence: con `key={stepIndex}` React ya desmonta el paso
          anterior y monta el siguiente de forma instantánea y fiable — solo
          animamos la ENTRADA del nuevo paso. AnimatePresence con mode="wait"
          se quedaba colgado en la animación de salida en ciertas
          transiciones, dejando el paso anterior visible para siempre (el bug
          de "se queda pillado" reportado). Prioriza que nunca se rompa por
          encima de la transición de salida. */}
      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        {step.type === 'example' && <ExampleDialogue lesson={lesson} onContinue={() => advance()} />}

        {step.type === 'intro' && (
          <VocabIntroCard words={step.words} partLabel={step.partLabel} onContinue={() => advance()} />
        )}

        {step.type === 'match' && (
          <Card>
            <ExerciseMatchVocabulary vocabulary={step.words} onComplete={advance} />
          </Card>
        )}

        {step.type === 'listening' && (
          <Card>
            <ExerciseListening vocabulary={step.words} distractorPool={lesson.vocabulary} onComplete={advance} />
          </Card>
        )}

        {step.type === 'partBreak' && (
          <LessonPartBreak partNumber={step.partNumber} totalParts={step.totalParts} onContinue={() => advance()} />
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

        {step.type === 'exam' && (
          <Card>
            <ExerciseMultipleChoice questions={shortExam} title="Comprobación final" onComplete={handleExamComplete} />
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

      <h2 className="font-display font-bold text-2xl text-alp-900 dark:text-alp-50 mb-1">¡Lección completada!</h2>
      <p className="text-alp-500 dark:text-alp-300 mb-6">{lesson.title[interfaceLang] ?? lesson.title.es}</p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="!p-3">
          <p className="text-2xl font-display font-bold text-swiss-red">+{xpEarned}</p>
          <p className="text-xs text-alp-500 dark:text-alp-300">XP</p>
        </Card>
        <Card className="!p-3">
          <p className="text-2xl font-display font-bold text-alp-800 dark:text-alp-100">{accuracy}%</p>
          <p className="text-xs text-alp-500 dark:text-alp-300">Precisión</p>
        </Card>
        <Card className="!p-3 flex flex-col items-center">
          <p className="text-2xl font-display font-bold text-cheese-600 dark:text-cheese-300 flex items-center gap-1">
            <Flame size={20} /> {streak}
          </p>
          <p className="text-xs text-alp-500 dark:text-alp-300">Racha</p>
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
