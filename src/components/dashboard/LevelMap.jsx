import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { LEVELS, computeLevelStates } from '../../data/levels/index.js'
import { getLessonsByLevel } from '../../data/lessons/index.js'
import { LevelCoverArt } from './LevelCoverArt.jsx'

const STATE_LABEL = {
  done: { es: 'Completado', en: 'Completed', pt: 'Concluído', fr: 'Terminé', it: 'Completato', sq: 'Përfunduar', tr: 'Tamamlandı' },
  current: { es: 'En curso', en: 'In progress', pt: 'Em curso', fr: 'En cours', it: 'In corso', sq: 'Në vazhdim', tr: 'Devam ediyor' },
  locked: { es: 'Bloqueado', en: 'Locked', pt: 'Bloqueado', fr: 'Verrouillé', it: 'Bloccato', sq: 'I bllokuar', tr: 'Kilitli' },
  soon: { es: 'Próximamente', en: 'Coming soon', pt: 'Brevemente', fr: 'Bientôt', it: 'Prossimamente', sq: 'Së shpejti', tr: 'Yakında' },
}

/**
 * Mapa completo del curso (A1.1 → C2), al estilo de la ruta de niveles de
 * otras apps de idiomas / una app de idiomas: portadas ilustradas, progreso por nivel, y
 * vista previa de temas para los niveles aún no publicados.
 */
export function LevelMap({ onOpenLesson }) {
  const { interfaceLang, t } = useLanguage()
  const { progress } = useUserProgress()
  const [expanded, setExpanded] = useState(null)

  const levels = computeLevelStates(progress.completedLessons, getLessonsByLevel, progress.settings.testModeUnlockAll)

  return (
    <div className="space-y-3">
      {levels.map((level) => {
        const isOpen = expanded === level.code
        const lessons = level.hasContent ? getLessonsByLevel(level.code) : []
        const label = STATE_LABEL[level.state][interfaceLang] ?? STATE_LABEL[level.state].es

        return (
          <div key={level.code} className="card !p-3">
            <button
              onClick={() => setExpanded(isOpen ? null : level.code)}
              className="w-full flex items-center gap-3 text-left"
            >
              <LevelCoverArt level={level} state={level.state} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-alp-400 dark:text-alp-400">{level.group}</span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full
                      ${level.state === 'done' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : ''}
                      ${level.state === 'current' ? 'bg-swiss-red/10 text-swiss-red dark:bg-swiss-red/20 dark:text-white' : ''}
                      ${level.state === 'locked' ? 'bg-alp-100 text-alp-400 dark:bg-alp-700 dark:text-alp-400' : ''}
                      ${level.state === 'soon' ? 'bg-cheese-100 text-cheese-700 dark:bg-cheese-900/40 dark:text-cheese-300' : ''}`}
                  >
                    {label}
                  </span>
                </div>
                <p className="font-display font-bold text-alp-900 dark:text-alp-50 truncate">
                  {level.title[interfaceLang] ?? level.title.es}
                </p>
                {level.hasContent && (
                  <p className="text-sm text-alp-500 dark:text-alp-300">
                    {level.doneCount}/{level.totalCount} lecciones
                  </p>
                )}
              </div>
              <ChevronDown
                size={18}
                className={`text-alp-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  {level.hasContent ? (
                    <div className="pt-3 mt-3 border-t border-alp-100 dark:border-alp-700 space-y-1.5">
                      {lessons.map((lesson) => {
                        const done = progress.completedLessons.includes(lesson.id)
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => onOpenLesson(lesson.id)}
                            className={`nav-item w-full flex items-center gap-2 p-2.5 rounded-lg text-left text-sm transition-colors min-h-[44px]
                              ${done
                                ? 'bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30'
                                : 'bg-alp-50 hover:bg-alp-100 dark:bg-alp-900 dark:hover:bg-alp-700'}`}
                          >
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                              ${done ? 'bg-green-500 text-white' : 'bg-swiss-red/10 text-swiss-red dark:bg-swiss-red/25 dark:text-white'}`}
                            >
                              {done ? '✓' : lesson.order}
                            </span>
                            <span className="font-medium text-alp-800 dark:text-alp-100">{lesson.title[interfaceLang] ?? lesson.title.es}</span>
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="pt-3 mt-3 border-t border-alp-100 dark:border-alp-700">
                      <p className="text-xs font-semibold text-cheese-700 dark:text-cheese-300 flex items-center gap-1 mb-2">
                        <Sparkles size={14} /> {label} — se aprenderá:
                      </p>
                      <ul className="space-y-1">
                        {(level.topics?.[interfaceLang] ?? level.topics?.es ?? []).map((topic) => (
                          <li key={topic} className="text-sm text-alp-600 dark:text-alp-300 flex items-start gap-2">
                            <span className="text-cheese-500 mt-0.5">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
