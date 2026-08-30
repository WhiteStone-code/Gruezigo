import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BookMarked, CalendarDays, Trophy } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { getLessonById, getLessonsByLevel, getNextLesson } from '../../data/lessons/index.js'
import { computeGroupStates } from '../../data/levels/index.js'
import { Card } from '../ui/Card.jsx'

function toISO(date) {
  return date.toISOString().slice(0, 10)
}

// Pequeño conteo ascendente para que los números no se sientan estáticos —
// un detalle sutil, no una animación llamativa.
function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf
    const start = performance.now()
    function tick(now) {
      const elapsed = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setValue(Math.round(target * eased))
      if (elapsed < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

function StatTile({ icon: Icon, value, suffix = '', label, accent }) {
  const shown = useCountUp(value)
  return (
    <div className="text-center">
      <div className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center mb-1.5 ${accent}`}>
        <Icon size={16} />
      </div>
      <p className="text-xl font-display font-bold text-alp-900 dark:text-alp-50">
        {shown}
        {suffix}
      </p>
      <p className="text-[11px] leading-tight text-alp-500 dark:text-alp-300">{label}</p>
    </div>
  )
}

/**
 * Vista de progreso enriquecida: tres números resumen y una fila compacta
 * de actividad de "esta semana" (distinta del calendario completo de
 * ActivityCalendar, que muestra mes a mes todo el histórico). Todo sale de
 * datos que ya existían en UserProgressContext y en las lecciones ya
 * cargadas — nada nuevo que persistir.
 */
export function ProgressOverview() {
  const { interfaceLang, t } = useLanguage()
  const { progress } = useUserProgress()

  const totalVocab = useMemo(() => {
    const seen = new Set()
    progress.completedLessons.forEach((id) => {
      getLessonById(id)?.vocabulary?.forEach((w) => seen.add(w.hochdeutsch))
    })
    return seen.size
  }, [progress.completedLessons])

  const activeDays = useMemo(() => new Set(progress.activityLog ?? []).size, [progress.activityLog])

  const mastery = useMemo(() => {
    const currentGroup = (getNextLesson(progress.completedLessons)?.level ?? progress.level).split('.')[0]
    const groups = computeGroupStates(progress.completedLessons, getLessonsByLevel, progress.settings.testModeUnlockAll)
    const group = groups.find((g) => g.code === currentGroup)
    if (!group || group.totalCount === 0) return 0
    return Math.round((group.doneCount / group.totalCount) * 100)
  }, [progress.completedLessons, progress.level, progress.settings.testModeUnlockAll])

  const week = useMemo(() => {
    const activitySet = new Set(progress.activityLog ?? [])
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const iso = toISO(d)
      days.push({
        iso,
        label: d.toLocaleDateString(interfaceLang, { weekday: 'narrow' }),
        active: activitySet.has(iso),
        isToday: i === 0,
      })
    }
    return days
  }, [progress.activityLog, interfaceLang])

  return (
    <Card className="card-accent-sky space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <StatTile
          icon={BookMarked}
          value={totalVocab}
          label={t('progressVocabLabel')}
          accent="bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-300"
        />
        <StatTile
          icon={CalendarDays}
          value={activeDays}
          label={t('progressActiveDaysLabel')}
          accent="bg-meadow-100 dark:bg-meadow-900/40 text-meadow-600 dark:text-meadow-300"
        />
        <StatTile
          icon={Trophy}
          value={mastery}
          suffix="%"
          label={t('progressMasteryLabel')}
          accent="bg-cheese-100 dark:bg-cheese-900/40 text-cheese-600 dark:text-cheese-300"
        />
      </div>

      <div>
        <p className="text-xs font-semibold text-alp-500 dark:text-alp-300 uppercase tracking-wide mb-2">
          {t('progressWeekLabel')}
        </p>
        <div className="flex justify-between gap-1.5">
          {week.map((day, idx) => (
            <div key={day.iso} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[10px] font-semibold text-alp-400 dark:text-alp-500 capitalize">{day.label}</span>
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`w-6 h-6 rounded-full
                  ${day.active
                    ? 'bg-meadow-400 dark:bg-meadow-500'
                    : 'bg-alp-100 dark:bg-alp-700 border border-alp-200 dark:border-alp-600'}
                  ${day.isToday ? 'ring-2 ring-swiss-red ring-offset-1 ring-offset-white dark:ring-offset-alp-800' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
