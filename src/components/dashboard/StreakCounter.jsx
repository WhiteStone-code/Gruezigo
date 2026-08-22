import { Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { Card } from '../ui/Card.jsx'

export function StreakCounter() {
  const { progress } = useUserProgress()
  const { t } = useLanguage()

  return (
    <Card className="flex items-center gap-4">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-14 h-14 rounded-full bg-swiss-red/10 flex items-center justify-center shrink-0"
      >
        <Flame size={28} className="text-swiss-red" />
      </motion.div>
      <div>
        <p className="text-2xl font-display font-bold text-alp-900">{progress.streak.current} días</p>
        <p className="text-sm text-alp-500">
          {t('streak')} · récord {progress.streak.longest}
        </p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-lg font-display font-bold text-cheese-600">{progress.xp} XP</p>
        <p className="text-xs text-alp-400">Nivel {progress.level}</p>
      </div>
    </Card>
  )
}
