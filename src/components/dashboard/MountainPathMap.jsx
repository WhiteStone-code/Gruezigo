import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Lock, Check, Sparkles, BookOpen, Mic, MessageCircle } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { LEVELS, computeLevelStates } from '../../data/levels/index.js'
import { getLessonsByLevel } from '../../data/lessons/index.js'

const NODE_GAP = 132 // separación vertical entre niveles, en px
const STATE_LABEL = {
  done: { es: 'Completado', en: 'Completed', pt: 'Concluído', fr: 'Terminé', it: 'Completato', sq: 'Përfunduar', tr: 'Tamamlandı' },
  current: { es: 'En curso', en: 'In progress', pt: 'Em curso', fr: 'En cours', it: 'In corso', sq: 'Në vazhdim', tr: 'Devam ediyor' },
  locked: { es: 'Bloqueado', en: 'Locked', pt: 'Bloqueado', fr: 'Verrouillé', it: 'Bloccato', sq: 'I bllokuar', tr: 'Kilitli' },
  soon: { es: 'Próximamente', en: 'Coming soon', pt: 'Brevemente', fr: 'Bientôt', it: 'Prossimamente', sq: 'Së shpejti', tr: 'Yakında' },
}

function nodeStateRing(state) {
  if (state === 'done') return 'ring-4 ring-meadow-400'
  if (state === 'current') return 'ring-4 ring-swiss-red'
  return 'ring-2 ring-alp-200 dark:ring-alp-700'
}

/**
 * Ruta de niveles estilo "camino de montaña suizo": nodos circulares
 * conectados por un sendero en zigzag (SVG), en vez de la lista de
 * tarjetas plana. Toca un nodo para ver sus lecciones (o su temario, si
 * todavía es "Próximamente") en una hoja inferior.
 */
export function MountainPathMap({ onOpenLesson }) {
  const { interfaceLang } = useLanguage()
  const { progress } = useUserProgress()
  const [openLevel, setOpenLevel] = useState(null)

  const levels = useMemo(
    () => computeLevelStates(progress.completedLessons, getLessonsByLevel, progress.settings.testModeUnlockAll),
    [progress.completedLessons, progress.settings.testModeUnlockAll]
  )

  const totalHeight = levels.length * NODE_GAP + 80
  const points = levels.map((_, i) => ({
    x: i % 2 === 0 ? 26 : 74,
    y: 60 + i * NODE_GAP,
  }))

  const pathD = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`
      const prev = points[i - 1]
      const midY = (prev.y + p.y) / 2
      return `C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`
    })
    .join(' ')

  const selected = levels.find((l) => l.code === openLevel)
  const selectedLessons = selected?.hasContent ? getLessonsByLevel(selected.code) : []

  return (
    <div className="relative" style={{ height: totalHeight }}>
      <svg
        viewBox={`0 0 100 ${totalHeight}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path d={pathD} fill="none" stroke="currentColor" strokeWidth="2.2" strokeDasharray="1 5" strokeLinecap="round" className="text-alp-300 dark:text-alp-600" />
      </svg>

      {levels.map((level, i) => {
        const p = points[i]
        const label = STATE_LABEL[level.state][interfaceLang] ?? STATE_LABEL[level.state].es
        return (
          <div
            key={level.code}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
            style={{ left: `${p.x}%`, top: p.y }}
          >
            <motion.button
              onClick={() => setOpenLevel(level.code)}
              whileTap={{ scale: 0.94 }}
              animate={level.state === 'current' ? { y: [0, -4, 0] } : {}}
              transition={{ repeat: level.state === 'current' ? Infinity : 0, duration: 1.8 }}
              className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${level.gradient} flex items-center justify-center shadow-card
                ${nodeStateRing(level.state)} ${level.state === 'locked' ? 'grayscale opacity-60' : ''}`}
            >
              <span className="text-2xl">{level.emoji[0]}</span>
              {level.state === 'done' && (
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-meadow-500 flex items-center justify-center border-2 border-white dark:border-alp-900">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </span>
              )}
              {level.state === 'locked' && (
                <span className="absolute inset-0 rounded-full bg-alp-900/30 flex items-center justify-center">
                  <Lock size={18} className="text-white" />
                </span>
              )}
            </motion.button>
            <span className="text-xs font-bold text-alp-700 dark:text-alp-200 bg-white/80 dark:bg-alp-800/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
              {level.code}
            </span>
            <span className="text-[10px] text-alp-400">{label}</span>
          </div>
        )
      })}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-alp-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenLevel(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="bg-white dark:bg-alp-800 rounded-t-3xl sm:rounded-xl2 shadow-card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selected.gradient} flex items-center justify-center text-xl`}>
                    {selected.emoji[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-alp-400">
                      {selected.chapterNumber ? `Capítulo ${selected.chapterNumber} · ${selected.group}` : selected.group}
                    </p>
                    <h3 className="font-display font-bold text-lg text-alp-900 dark:text-alp-50">
                      {selected.title[interfaceLang] ?? selected.title.es}
                    </h3>
                  </div>
                </div>
                <button onClick={() => setOpenLevel(null)} className="nav-item text-alp-400 hover:text-alp-700 dark:hover:text-alp-200 min-h-[44px] min-w-[44px]">
                  <X size={22} />
                </button>
              </div>

              {selected.hasContent ? (
                <div className="space-y-2">
                  {selectedLessons.map((lesson) => {
                    const done = progress.completedLessons.includes(lesson.id)
                    // Insignias de tipo de lección, al estilo de los nodos
                    // amarillos "Gramática" / morados "Habla" del mapa de
                    // una app de idiomas — derivadas del propio contenido de la lección,
                    // no de un campo aparte que se pueda desincronizar.
                    const hasGrammar = lesson.theory?.length > 0
                    const hasSpeaking = lesson.exercises?.pronunciation?.length > 0
                    const hasSimulation = lesson.dialogueSimulations?.length > 0
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setOpenLevel(null)
                          onOpenLesson(lesson.id)
                        }}
                        className={`nav-item w-full flex items-center gap-2 p-3 rounded-xl text-left text-sm transition-colors min-h-[44px]
                          ${done ? 'bg-green-50 hover:bg-green-100 dark:bg-green-900/20' : 'bg-alp-50 hover:bg-alp-100 dark:bg-alp-900'}`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${done ? 'bg-green-500 text-white' : 'bg-swiss-red/10 text-swiss-red dark:bg-swiss-red/25 dark:text-white'}`}>
                          {done ? '✓' : lesson.order}
                        </span>
                        <span className="font-medium text-alp-800 dark:text-alp-100 flex-1">{lesson.title[interfaceLang] ?? lesson.title.es}</span>
                        <span className="flex items-center gap-1 shrink-0">
                          {hasGrammar && (
                            <span title="Incluye gramática" className="w-5 h-5 rounded-full bg-cheese-100 dark:bg-cheese-900/40 flex items-center justify-center">
                              <BookOpen size={11} className="text-cheese-700 dark:text-cheese-300" />
                            </span>
                          )}
                          {hasSpeaking && (
                            <span title="Práctica de expresión oral" className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center">
                              <Mic size={11} className="text-sky-700 dark:text-sky-300" />
                            </span>
                          )}
                          {hasSimulation && (
                            <span title="Simulación de diálogo" className="w-5 h-5 rounded-full bg-meadow-100 dark:bg-meadow-900/40 flex items-center justify-center">
                              <MessageCircle size={11} className="text-meadow-700 dark:text-meadow-300" />
                            </span>
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-cheese-700 dark:text-cheese-300 flex items-center gap-1 mb-2">
                    <Sparkles size={14} /> Próximamente — se aprenderá:
                  </p>
                  <ul className="space-y-1">
                    {(selected.topics?.[interfaceLang] ?? selected.topics?.es ?? []).map((topic) => (
                      <li key={topic} className="text-sm text-alp-600 dark:text-alp-300 flex items-start gap-2">
                        <span className="text-cheese-500 mt-0.5">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
