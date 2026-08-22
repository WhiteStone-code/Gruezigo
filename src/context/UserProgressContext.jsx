import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const UserProgressContext = createContext(null)

const DEFAULT_PROGRESS = {
  canton: 'zurich',
  level: 'A1.1',
  xp: 0,
  streak: {
    current: 0,
    longest: 0,
    lastActiveDate: null, // 'YYYY-MM-DD'
  },
  completedLessons: [], // ['a1-01', ...]
  badges: [], // ['racha-7', 'a1-completo', ...]
  exerciseStats: {}, // { [lessonId]: { correct, total } }
  settings: {
    ageGroup: 'adult', // 'teen' | 'young-adult' | 'adult' | 'senior'
    textSize: 'normal', // 'normal' | 'grande' | 'muy-grande'
    testModeUnlockAll: false, // desbloquea todos los niveles para poder probarlos
    reviewRemindersEnabled: true,
  },
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function daysBetween(a, b) {
  const d1 = new Date(a)
  const d2 = new Date(b)
  return Math.round((d2 - d1) / 86400000)
}

export function UserProgressProvider({ children }) {
  const [raw, setProgress] = useLocalStorage('gruezigo:progress', DEFAULT_PROGRESS)

  // Fusiona con los valores por defecto para que el progreso guardado antes
  // de añadir un campo nuevo (p. ej. `settings`) no rompa la app.
  const progress = useMemo(
    () => ({
      ...DEFAULT_PROGRESS,
      ...raw,
      streak: { ...DEFAULT_PROGRESS.streak, ...raw.streak },
      settings: { ...DEFAULT_PROGRESS.settings, ...raw.settings },
    }),
    [raw]
  )

  const actions = useMemo(
    () => ({
      setCanton: (canton) => setProgress((p) => ({ ...p, canton })),

      addXp: (amount) => setProgress((p) => ({ ...p, xp: p.xp + amount })),

      registerActivityToday: () =>
        setProgress((p) => {
          const today = todayISO()
          if (p.streak.lastActiveDate === today) return p // ya contabilizado hoy
          const gap = p.streak.lastActiveDate ? daysBetween(p.streak.lastActiveDate, today) : null
          const current = gap === 1 || gap === null ? p.streak.current + 1 : 1
          return {
            ...p,
            streak: {
              current,
              longest: Math.max(current, p.streak.longest ?? 0),
              lastActiveDate: today,
            },
          }
        }),

      completeLesson: (lessonId, { correct, total } = {}) =>
        setProgress((p) => ({
          ...p,
          completedLessons: p.completedLessons.includes(lessonId)
            ? p.completedLessons
            : [...p.completedLessons, lessonId],
          exerciseStats: {
            ...p.exerciseStats,
            [lessonId]: { correct: correct ?? 0, total: total ?? 0 },
          },
        })),

      unlockBadge: (badgeId) =>
        setProgress((p) => (p.badges.includes(badgeId) ? p : { ...p, badges: [...p.badges, badgeId] })),

      updateSettings: (patch) =>
        setProgress((p) => ({ ...p, settings: { ...DEFAULT_PROGRESS.settings, ...p.settings, ...patch } })),

      resetProgress: () => setProgress(DEFAULT_PROGRESS),
    }),
    [setProgress]
  )

  const value = { progress, ...actions }

  return <UserProgressContext.Provider value={value}>{children}</UserProgressContext.Provider>
}

export function useUserProgress() {
  const ctx = useContext(UserProgressContext)
  if (!ctx) throw new Error('useUserProgress debe usarse dentro de <UserProgressProvider>')
  return ctx
}
