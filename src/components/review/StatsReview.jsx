import { TrendingUp, TrendingDown, Award, Flame } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { ALL_LESSONS } from '../../data/lessons/index.js'
import { getAllLessonAccuracies, getOverallAccuracy, getStrongestLesson, getWeakestLesson } from '../../data/progressInsights.js'
import { Card } from '../ui/Card.jsx'
import { EmptyState } from '../ui/EmptyState.jsx'
import { ActivityCalendar } from './ActivityCalendar.jsx'

const BADGE_LABELS = {
  'racha-7': { emoji: '🔥', label: 'Racha de 7 días' },
  'racha-30': { emoji: '🏔️', label: 'Racha de 30 días' },
}

export function StatsReview({ onPracticeLesson }) {
  const { interfaceLang, t } = useLanguage()
  const { progress } = useUserProgress()
  const overall = getOverallAccuracy(progress.exerciseStats)
  const weakest = getWeakestLesson(progress.exerciseStats, ALL_LESSONS)
  const strongest = getStrongestLesson(progress.exerciseStats, ALL_LESSONS)
  const all = getAllLessonAccuracies(progress.exerciseStats, ALL_LESSONS)

  if (overall === null) {
    return (
      <div className="space-y-4">
        <ActivityCalendar />
        <EmptyState
          icon="📊"
          title={t('statsEmptyTitle')}
          description={t('statsEmptyDescription')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ActivityCalendar />

      <div className="grid grid-cols-3 gap-3">
        <Card className="!p-3 text-center">
          <p className="text-2xl font-display font-bold text-swiss-red">{overall}%</p>
          <p className="text-xs text-alp-500 dark:text-alp-300">Precisión global</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-2xl font-display font-bold text-cheese-600 dark:text-cheese-300 flex items-center justify-center gap-1">
            <Flame size={18} /> {progress.streak.current}
          </p>
          <p className="text-xs text-alp-500 dark:text-alp-300">Racha</p>
        </Card>
        <Card className="!p-3 text-center">
          <p className="text-2xl font-display font-bold text-alp-800 dark:text-alp-100">{progress.xp}</p>
          <p className="text-xs text-alp-500 dark:text-alp-300">XP</p>
        </Card>
      </div>

      {strongest && (
        <Card className="card-accent-meadow flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-meadow-100 dark:bg-meadow-900/40 flex items-center justify-center shrink-0">
            <TrendingUp size={20} className="text-meadow-600 dark:text-meadow-300" />
          </div>
          <div>
            <p className="text-xs font-semibold text-meadow-700 dark:text-meadow-300 uppercase tracking-wide">En qué eres mejor</p>
            <p className="font-semibold text-alp-900 dark:text-alp-50">{strongest.lesson.title[interfaceLang] ?? strongest.lesson.title.es}</p>
            <p className="text-sm text-alp-500 dark:text-alp-300">{Math.round(strongest.accuracy * 100)}% de aciertos</p>
          </div>
        </Card>
      )}

      {weakest && (
        <Card className="card-accent-wood flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-wood-100 dark:bg-wood-900/40 flex items-center justify-center shrink-0">
            <TrendingDown size={20} className="text-wood-600 dark:text-wood-300" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-wood-700 dark:text-wood-300 uppercase tracking-wide">Qué conviene reforzar</p>
            <p className="font-semibold text-alp-900 dark:text-alp-50">{weakest.lesson.title[interfaceLang] ?? weakest.lesson.title.es}</p>
            <p className="text-sm text-alp-500 dark:text-alp-300">{Math.round(weakest.accuracy * 100)}% de aciertos</p>
          </div>
          {onPracticeLesson && (
            <button
              onClick={() => onPracticeLesson(weakest.lesson.id)}
              className="text-sm font-semibold text-swiss-red hover:underline shrink-0"
            >
              Practicar
            </button>
          )}
        </Card>
      )}

      <Card>
        <h4 className="font-display font-bold text-alp-900 dark:text-alp-50 mb-3 flex items-center gap-2">
          <Award size={18} className="text-cheese-500" /> Medallas
        </h4>
        {progress.badges.length === 0 ? (
          <p className="text-sm text-alp-500 dark:text-alp-300">Todavía no tienes medallas — ¡completa lecciones para desbloquearlas!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {progress.badges.map((badgeId) => {
              const meta = BADGE_LABELS[badgeId] ?? { emoji: '🎖️', label: badgeId }
              return (
                <span key={badgeId} className="px-3 py-1.5 rounded-full bg-cheese-50 dark:bg-cheese-900/30 text-sm font-semibold text-cheese-700 dark:text-cheese-300">
                  {meta.emoji} {meta.label}
                </span>
              )
            })}
          </div>
        )}
      </Card>

      <Card>
        <h4 className="font-display font-bold text-alp-900 dark:text-alp-50 mb-3">Todas tus lecciones</h4>
        <div className="space-y-2">
          {all.map(({ lesson, accuracy }) => (
            <div key={lesson.id} className="flex items-center gap-3">
              <p className="flex-1 text-sm text-alp-700 dark:text-alp-200 truncate">{lesson.title[interfaceLang] ?? lesson.title.es}</p>
              <div className="w-24 h-2 rounded-full bg-alp-100 dark:bg-alp-700 overflow-hidden shrink-0">
                <div
                  className={`h-full rounded-full ${accuracy >= 0.8 ? 'bg-meadow-500' : accuracy >= 0.5 ? 'bg-cheese-400' : 'bg-swiss-red'}`}
                  style={{ width: `${Math.round(accuracy * 100)}%` }}
                />
              </div>
              <span className="text-xs text-alp-500 w-9 text-right shrink-0">{Math.round(accuracy * 100)}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
