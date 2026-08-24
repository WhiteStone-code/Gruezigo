import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Flame, CalendarCheck } from 'lucide-react'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { Card } from '../ui/Card.jsx'

const WEEKDAY_LABELS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

function buildMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1)
  const startOffset = (firstOfMonth.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push({ date: null })
  for (let day = 1; day <= daysInMonth; day++) cells.push({ date: new Date(year, month, day) })
  while (cells.length % 7 !== 0) cells.push({ date: null })
  return cells
}

function toISO(date) {
  return date.toISOString().slice(0, 10)
}

/**
 * Calendario de actividad: marca qué días has practicado en GrüeziGo y
 * cuáles no, mes a mes — como el gráfico de contribuciones de GitHub, pero
 * para tu racha de idioma. Se alimenta de `progress.activityLog`, que se
 * registra tanto al terminar una lección como al terminar una sesión de
 * Práctica libre.
 */
export function ActivityCalendar() {
  const { progress } = useUserProgress()
  const today = useMemo(() => new Date(), [])
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const activitySet = useMemo(() => new Set(progress.activityLog ?? []), [progress.activityLog])
  const grid = useMemo(() => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()), [cursor])
  const monthLabel = cursor.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  const todayISO = toISO(today)

  const activeThisMonth = grid.filter((c) => c.date && activitySet.has(toISO(c.date))).length
  const daysSoFarThisMonth = grid.filter((c) => c.date && c.date <= today).length

  return (
    <Card className="card-accent-meadow">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="nav-item p-2 rounded-full hover:bg-alp-50 dark:hover:bg-alp-700 text-alp-600 dark:text-alp-300 min-h-[44px] min-w-[44px]"
          aria-label="Mes anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <h4 className="font-display font-bold text-alp-900 dark:text-alp-50 flex items-center gap-1.5 justify-center">
            <CalendarCheck size={16} className="text-meadow-600 dark:text-meadow-300" /> Tu actividad
          </h4>
          <p className="text-xs text-alp-500 dark:text-alp-300 capitalize">{monthLabel}</p>
        </div>
        <button
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          disabled={cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth()}
          className="nav-item p-2 rounded-full hover:bg-alp-50 dark:hover:bg-alp-700 text-alp-600 dark:text-alp-300 disabled:opacity-30 min-h-[44px] min-w-[44px]"
          aria-label="Mes siguiente"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-alp-500 mb-1">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-3">
        {grid.map((cell, idx) => {
          if (!cell.date) return <div key={idx} className="aspect-square" />
          const iso = toISO(cell.date)
          const isActive = activitySet.has(iso)
          const isToday = iso === todayISO
          const isFuture = cell.date > today

          return (
            <div
              key={idx}
              title={isActive ? `Practicaste el ${cell.date.getDate()}` : undefined}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold
                ${isToday ? 'ring-2 ring-swiss-red' : ''}
                ${isActive
                  ? 'bg-meadow-400 text-white dark:bg-meadow-500'
                  : isFuture
                    ? 'text-alp-300 dark:text-alp-600'
                    : 'bg-alp-100 dark:bg-alp-700 text-alp-500 dark:text-alp-400'}`}
            >
              {cell.date.getDate()}
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-alp-500 dark:text-alp-300">
          {activeThisMonth}/{daysSoFarThisMonth} días activos este mes
        </span>
        <span className="flex items-center gap-1 font-semibold text-swiss-red">
          <Flame size={14} /> racha de {progress.streak.current}
        </span>
      </div>
    </Card>
  )
}
