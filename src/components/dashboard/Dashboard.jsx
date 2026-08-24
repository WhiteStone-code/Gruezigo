import { motion } from 'framer-motion'
import { BookOpenCheck, MapPin, Map } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { getNextLesson } from '../../data/lessons/index.js'
import { CANTONS, getUpcomingEvent } from '../../data/cantons/holidays.js'
import { StreakCounter } from './StreakCounter.jsx'
import { ReviewReminderBanner } from './ReviewReminderBanner.jsx'
import { Card } from '../ui/Card.jsx'
import { Button } from '../ui/Button.jsx'

export function Dashboard({ onOpenLesson, onOpenCalendar, onOpenRoadmap }) {
  const { interfaceLang, t } = useLanguage()
  const { progress } = useUserProgress()
  const nextLesson = getNextLesson(progress.completedLessons)
  const upcomingEvent = getUpcomingEvent(progress.canton)
  const cantonMeta = CANTONS.find((c) => c.id === progress.canton)

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-5 bg-topo">
      <div>
        <h1 className="font-display font-bold text-2xl text-alp-900 dark:text-alp-50">Grüezi! 👋</h1>
        <p className="text-alp-500 dark:text-alp-300">{t('tagline')}</p>
      </div>

      <StreakCounter />

      <ReviewReminderBanner
        exerciseStats={progress.exerciseStats}
        ageGroup={progress.settings.ageGroup}
        enabled={progress.settings.reviewRemindersEnabled}
        onPractice={onOpenLesson}
      />

      {nextLesson && (
        <motion.div whileHover={{ y: -2 }}>
          <div className="card-lg bg-gradient-to-br from-swiss-red to-swiss-red-dark text-white dark:ring-1 dark:ring-swiss-red-dark/60 dark:shadow-lg dark:shadow-black/30">
            <p className="text-xs uppercase tracking-wide opacity-80 mb-1">{nextLesson.level.split('.')[0]}</p>
            <h3 className="font-display font-bold text-xl mb-3">{nextLesson.title[interfaceLang] ?? nextLesson.title.es}</h3>
            <Button
              variant="secondary"
              onClick={() => onOpenLesson(nextLesson.id)}
              className="!bg-white !text-swiss-red flex items-center gap-2"
            >
              <BookOpenCheck size={18} /> {t('continue')}
            </Button>
          </div>
        </motion.div>
      )}

      <Card className="card-accent-sky">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display font-bold text-alp-900 dark:text-alp-50 flex items-center gap-2">
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
              <p className="font-semibold text-alp-800 dark:text-alp-100 text-sm">{upcomingEvent.name}</p>
              <p className="text-sm text-alp-500 dark:text-alp-300">
                {new Date(upcomingEvent.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-alp-500 dark:text-alp-300">{t('noUpcomingEvents')}</p>
        )}
      </Card>

      <motion.button onClick={onOpenRoadmap} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="w-full nav-item">
        <Card className="card-accent-cheese flex items-center gap-3 hover:shadow-card-lg dark:hover:border-cheese-400/50 transition-shadow">
          <div className="w-11 h-11 rounded-full bg-cheese-100 dark:bg-cheese-900/40 flex items-center justify-center shrink-0">
            <Map size={20} className="text-cheese-600 dark:text-cheese-300" />
          </div>
          <div className="text-left flex-1">
            <p className="font-display font-bold text-alp-900 dark:text-alp-50">{t('fullRoadmapTitle')}</p>
            <p className="text-sm text-alp-500 dark:text-alp-300">{t('fullRoadmapSubtitle')}</p>
          </div>
          <span className="text-alp-300">→</span>
        </Card>
      </motion.button>
    </div>
  )
}
