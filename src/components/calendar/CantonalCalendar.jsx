import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, PartyPopper, Landmark, Sparkles } from 'lucide-react'
import { CANTONS, getCantonEvents } from '../../data/cantons/holidays.js'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { CantonSelector } from './CantonSelector.jsx'
import { Card } from '../ui/Card.jsx'

const WEEKDAY_LABELS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

function buildMonthGrid(year, month) {
  // month: 0-11. Genera celdas incluyendo días del mes anterior/siguiente
  // para completar semanas de lunes a domingo.
  const firstOfMonth = new Date(year, month, 1)
  const startOffset = (firstOfMonth.getDay() + 6) % 7 // 0 = lunes
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startOffset; i++) {
    cells.push({ date: null, inMonth: false })
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    cells.push({ date, inMonth: true })
  }
  while (cells.length % 7 !== 0) {
    cells.push({ date: null, inMonth: false })
  }
  return cells
}

function toISO(date) {
  return date.toISOString().slice(0, 10)
}

const typeIcon = {
  national: Landmark,
  cantonal: Landmark,
  cultural: PartyPopper,
}

export function CantonalCalendar() {
  const { progress, setCanton } = useUserProgress()
  const { t } = useLanguage()
  const canton = progress.canton
  const today = useMemo(() => new Date(), [])
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedEvent, setSelectedEvent] = useState(null)

  const events = useMemo(() => getCantonEvents(canton), [canton])
  const eventsByDate = useMemo(() => {
    const map = new Map()
    events.forEach((event) => map.set(event.date, event))
    return map
  }, [events])

  const grid = useMemo(() => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()), [cursor])

  const monthLabel = cursor.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  const upcoming = useMemo(() => {
    const iso = toISO(today)
    return events.filter((e) => e.date >= iso).slice(0, 4)
  }, [events, today])

  const cantonMeta = CANTONS.find((c) => c.id === canton)

  return (
    <div className="space-y-5">
      <Card>
        <CantonSelector value={canton} onChange={setCanton} />
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="nav-item p-2 rounded-full hover:bg-alp-50 dark:hover:bg-alp-700 text-alp-600 dark:text-alp-300 min-h-[44px] min-w-[44px]"
            aria-label="Mes anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="text-center">
            <h3 className="font-display font-bold text-lg capitalize text-alp-900 dark:text-alp-50">{monthLabel}</h3>
            <p className="text-sm text-alp-500 dark:text-alp-300">
              {t('calendar')} · {cantonMeta?.name}
            </p>
          </div>
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="nav-item p-2 rounded-full hover:bg-alp-50 dark:hover:bg-alp-700 text-alp-600 dark:text-alp-300 min-h-[44px] min-w-[44px]"
            aria-label="Mes siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-alp-500 dark:text-alp-400 mb-1">
          {WEEKDAY_LABELS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {grid.map((cell, idx) => {
            if (!cell.inMonth) return <div key={idx} className="aspect-square" />
            const iso = toISO(cell.date)
            const event = eventsByDate.get(iso)
            const isToday = iso === toISO(today)
            const Icon = event ? typeIcon[event.type] ?? Sparkles : null

            return (
              <button
                key={idx}
                onClick={() => event && setSelectedEvent(event)}
                className={`nav-item aspect-square rounded-lg flex flex-col items-center justify-center relative text-sm
                  transition-colors
                  ${isToday ? 'ring-2 ring-swiss-red' : ''}
                  ${event
                    ? 'bg-cheese-50 hover:bg-cheese-100 dark:bg-cheese-900/30 dark:hover:bg-cheese-900/50 cursor-pointer'
                    : 'hover:bg-alp-50 dark:hover:bg-alp-700'}`}
              >
                <span className={isToday ? 'font-bold text-swiss-red' : 'text-alp-700 dark:text-alp-200'}>{cell.date.getDate()}</span>
                {event && (
                  <span className="absolute bottom-0.5 text-[10px] leading-none" title={event.name}>
                    {event.icon}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </Card>

      <Card className="card-accent-cheese">
        <h4 className="font-display font-bold text-alp-900 dark:text-alp-50 mb-3 flex items-center gap-2">
          <Sparkles size={18} className="text-cheese-500" />
          Próximos festivos y eventos
        </h4>
        <div className="space-y-2">
          {upcoming.map((event) => {
            const Icon = typeIcon[event.type] ?? Sparkles
            return (
              <motion.button
                key={event.date + event.name}
                onClick={() => setSelectedEvent(event)}
                whileHover={{ x: 4 }}
                className="nav-item w-full flex items-center gap-3 p-3 rounded-xl bg-alp-50 hover:bg-alp-100 dark:bg-alp-900 dark:hover:bg-alp-700 text-left transition-colors min-h-[44px]"
              >
                <span className="text-2xl">{event.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-alp-900 dark:text-alp-50 text-sm">{event.name}</p>
                  <p className="text-sm text-alp-500 dark:text-alp-300">
                    {new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                  </p>
                </div>
                <Icon size={16} className="text-alp-500" />
              </motion.button>
            )
          })}
          {upcoming.length === 0 && (
            <p className="text-sm text-alp-500 dark:text-alp-300">No hay más eventos registrados este año para este cantón.</p>
          )}
        </div>
      </Card>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-alp-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white dark:bg-alp-800 rounded-xl2 shadow-card p-6 max-w-sm w-full animate-pop-in"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl mb-2">{selectedEvent.icon}</div>
              <h3 className="font-display font-bold text-xl text-alp-900 dark:text-alp-50">{selectedEvent.name}</h3>
              <p className="text-sm text-alp-500 dark:text-alp-300 mb-3">
                {new Date(selectedEvent.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                {' · '}
                {cantonMeta?.name}
              </p>
              <p className="text-sm text-alp-700 dark:text-alp-200 leading-relaxed">{selectedEvent.description}</p>
              <button onClick={() => setSelectedEvent(null)} className="btn-secondary mt-4 w-full">
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
