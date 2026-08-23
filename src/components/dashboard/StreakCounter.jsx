import { Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { getNextLesson } from '../../data/lessons/index.js'
import { Card } from '../ui/Card.jsx'

export function StreakCounter() {
  const { progress } = useUserProgress()
  const { t } = useLanguage()
  // Nivel real derivado del progreso (no del campo `progress.level`, que
  // nunca se actualiza) — y mostramos solo el grupo CEFR (p. ej. "A1"), no
  // el código de capítulo interno (p. ej. "A1.3").
  const currentGroup = (getNextLesson(progress.completedLessons)?.level ?? progress.level).split('.')[0]

  return (
    <Card className="card-lg flex items-center gap-4">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-14 h-14 rounded-full bg-swiss-red/10 dark:bg-swiss-red/20 flex items-center justify-center shrink-0"
      >
        <Flame size={28} className="text-swiss-red" />
      </motion.div>
      <div>
        <p className="text-2xl font-display font-bold text-alp-900 dark:text-alp-50">{progress.streak.current} días</p>
        <p className="text-sm text-alp-500 dark:text-alp-300">
          {t('streak')} · récord {progress.streak.longest}
        </p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-lg font-display font-bold text-cheese-600 dark:text-cheese-300">{progress.xp} XP</p>
        <p className="text-sm text-alp-400 dark:text-alp-400">Nivel {currentGroup}</p>
      </div>
    </Card>
  )
}
