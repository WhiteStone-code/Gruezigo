import { motion } from 'framer-motion'
import { BookOpenCheck, MapPin } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { getLessonsByLevel } from '../../data/lessons/index.js'
import { CANTONS, getUpcomingEvent } from '../../data/cantons/holidays.js'
import { StreakCounter } from './StreakCounter.jsx'
import { Card } from '../ui/Card.jsx'
import { Button } from '../ui/Button.jsx'

export function Dashboard({ onOpenLesson, onOpenCalendar }) {
  const { interfaceLang, t } = useLanguage()
  const { progress } = useUserProgress()
  const lessons = getLessonsByLevel(progress.level)
  const nextLesson = lessons.find((l) => !progress.completedLessons.includes(l.id)) ?? lessons[0]
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

      <Card>
        <h3 className="font-display font-bold text-alp-900 mb-3">Tu ruta {progress.level}</h3>
        <div className="space-y-2">
          {lessons.map((lesson) => {
            const done = progress.completedLessons.includes(lesson.id)
            return (
              <button
                key={lesson.id}
                onClick={() => onOpenLesson(lesson.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors
                  ${done ? 'bg-green-50 hover:bg-green-100' : 'bg-alp-50 hover:bg-alp-100'}`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                  ${done ? 'bg-green-500 text-white' : 'bg-alp-200 text-alp-600'}`}
                >
                  {done ? '✓' : lesson.order}
                </span>
                <span className="font-medium text-alp-800 text-sm">{lesson.title[interfaceLang] ?? lesson.title.es}</span>
              </button>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
