import { motion } from 'framer-motion'
import { BookOpenCheck, MapPin, Map } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { getNextLesson } from '../../data/lessons/index.js'
import { CANTONS, getUpcomingEvent } from '../../data/cantons/holidays.js'
import { StreakCounter } from './StreakCounter.jsx'
import { Card } from '../ui/Card.jsx'
import { Button } from '../ui/Button.jsx'

export function Dashboard({ onOpenLesson, onOpenCalendar, onOpenRoadmap }) {
  const { interfaceLang, t } = useLanguage()
  const { progress } = useUserProgress()
  const nextLesson = getNextLesson(progress.completedLessons)
  const upcomingEvent = getUpcomingEvent(progress.canton)
  const cantonMeta = CANTONS.find((c) => c.id === progress.canton)

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-alp-900">Grüezi! 👋</h1>
        <p className="text-alp-500">{t('tagline')}</p>
      </div>

      <StreakCounter />

      {nextLesson && (
        <motion.div whileHover={{ y: -2 }}>
          <Card className="bg-gradient-to-br from-swiss-red to-swiss-red-dark text-white">
            <p className="text-xs uppercase tracking-wide opacity-80 mb-1">{nextLesson.level}</p>
            <h3 className="font-display font-bold text-xl mb-3">{nextLesson.title[interfaceLang] ?? nextLesson.title.es}</h3>
            <Button
              variant="secondary"
              onClick={() => onOpenLesson(nextLesson.id)}
              className="!bg-white !text-swiss-red flex items-center gap-2"
            >
              <BookOpenCheck size={18} /> {t('continue')}
            </Button>
          </Card>
        </motion.div>
      )}

      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display font-bold text-alp-900 flex items-center gap-2">
            <MapPin size={18} className="text-swiss-red" /> {cantonMeta?.name}
          </h3>
          <button onClick={onOpenCalendar} className="text-sm font-semibold text-swiss-red hover:underline">
            {t('calendar')} →
          </button>
        </div>
        {upcomingEvent ? (
          <div className="flex items-center gap-3">
            <span className="text-3xl">{upcomingEvent.icon}</span>
            <div>
              <p className="font-semibold text-alp-800 text-sm">{upcomingEvent.name}</p>
              <p className="text-xs text-alp-500">
                {new Date(upcomingEvent.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-alp-500">Sin próximos eventos registrados.</p>
        )}
      </Card>

      <button onClick={onOpenRoadmap} className="w-full">
        <Card className="flex items-center gap-3 hover:bg-alp-50 transition-colors">
          <div className="w-11 h-11 rounded-full bg-cheese-100 flex items-center justify-center shrink-0">
            <Map size={20} className="text-cheese-600" />
          </div>
          <div className="text-left flex-1">
            <p className="font-display font-bold text-alp-900">Ver el mapa completo A1 → C2</p>
            <p className="text-xs text-alp-500">Tu ruta entera, nivel a nivel</p>
          </div>
          <span className="text-alp-300">→</span>
        </Card>
      </button>
    </div>
  )
}
