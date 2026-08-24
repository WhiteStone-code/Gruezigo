import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { getWeakestLesson } from '../../data/progressInsights.js'
import { ALL_LESSONS } from '../../data/lessons/index.js'

// Variantes de copy — ver docs/review-reminder-copy.md para el criterio.
// "teen"/"young-adult" reciben el tono más juguetón; "senior" recibe una
// versión calmada, sin jerga ni cadenas de emoji.
const VARIANTS_DEFAULT = [
  (topic, pct) => `💡 Oye, hace tiempo que no repasas ${topic} — ahí llevas un ${pct}% de aciertos. ¿5 minutos para reforzarlo?`,
  (topic, pct) => `👀 Vimos que ${topic} anda un poco flojo (${pct}% de aciertos). Un repasito rápido y lo dominas del todo.`,
  (topic, pct) => `Llevas un ${pct}% en ${topic}. No es grave, pero un empujoncito ahora te ahorra dudas más adelante. ¿Le echamos un vistazo?`,
  (topic, pct) => `🌱 Todavía estás construyendo ${topic} (${pct}% de aciertos) — así se aprende, poco a poco. ¿Seguimos practicando un poco hoy?`,
]
const VARIANTS_SENIOR = [
  (topic, pct) => `Recordatorio: tu progreso en ${topic} está en ${pct}%. Cuando tenga un rato libre, sería buen momento para repasarlo.`,
  (topic, pct) => `Cuando le venga bien, convendría repasar ${topic} — ahora mismo lleva un ${pct}% de aciertos.`,
]

/**
 * Banner de repaso "de vez en cuando": se apoya en las estadísticas reales
 * (exerciseStats) para señalar el tema más flojo, sin ser insistente — se
 * puede cerrar y respeta el ajuste "Recordatorios de repaso" de Ajustes.
 */
export function ReviewReminderBanner({ exerciseStats, ageGroup, enabled, onPractice }) {
  const { interfaceLang, t } = useLanguage()
  const [dismissed, setDismissed] = useState(false)

  const weakest = useMemo(() => getWeakestLesson(exerciseStats, ALL_LESSONS), [exerciseStats])

  const message = useMemo(() => {
    if (!weakest) return null
    const variants = ageGroup === 'senior' ? VARIANTS_SENIOR : VARIANTS_DEFAULT
    const pick = variants[Math.floor(Math.random() * variants.length)]
    const topic = weakest.lesson.title[interfaceLang] ?? weakest.lesson.title.es
    return pick(topic, Math.round(weakest.accuracy * 100))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weakest])

  if (!enabled || dismissed || !weakest || weakest.accuracy >= 0.8) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="card card-accent-cheese flex items-start gap-3"
      >
        <div className="w-9 h-9 rounded-full bg-cheese-100 dark:bg-cheese-900/40 flex items-center justify-center shrink-0">
          <Lightbulb size={18} className="text-cheese-600 dark:text-cheese-300" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-alp-700 dark:text-alp-200">{message}</p>
          <button
            onClick={() => onPractice(weakest.lesson.id)}
            className="text-sm font-semibold text-swiss-red hover:underline mt-1"
          >
            {t('practiceNow')}
          </button>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="nav-item text-alp-500 hover:text-alp-600 dark:hover:text-alp-200 shrink-0"
          aria-label={t('close')}
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
