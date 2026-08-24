import { useState } from 'react'
import { BookOpenText, SpellCheck, Library, Dumbbell, BarChart3 } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { GrammarReview } from './GrammarReview.jsx'
import { VerbsReview } from './VerbsReview.jsx'
import { VocabularyBrowser } from './VocabularyBrowser.jsx'
import { PracticeSession } from './PracticeSession.jsx'
import { StatsReview } from './StatsReview.jsx'

const TABS = [
  { id: 'grammar', labelKey: 'tabGrammar', icon: BookOpenText },
  { id: 'verbs', labelKey: 'tabVerbs', icon: SpellCheck },
  { id: 'vocabulary', labelKey: 'tabVocabulary', icon: Library },
  { id: 'practice', labelKey: 'tabPractice', icon: Dumbbell },
  { id: 'stats', labelKey: 'tabStats', icon: BarChart3 },
]

/**
 * "Repaso": el centro de referencia y práctica libre de GrüeziGo. Reutiliza
 * al máximo el contenido y los componentes de ejercicio que ya existen por
 * lección — nada aquí duplica datos, solo los reorganiza para consultar y
 * practicar fuera del flujo lineal de lecciones.
 */
export function ReviewHub({ onOpenLesson }) {
  const { t } = useLanguage()
  const [tab, setTab] = useState('practice')

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-4 pb-24">
      <div>
        <h2 className="font-display font-bold text-2xl text-alp-900 dark:text-alp-50">{t('reviewTitle')}</h2>
        <p className="text-sm text-alp-500 dark:text-alp-300">{t('reviewSubtitle')}</p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {TABS.map(({ id, labelKey, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`nav-item flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px]
              ${tab === id
                ? 'bg-swiss-red text-white border-swiss-red shadow-sm'
                : 'bg-white dark:bg-alp-800 text-alp-600 dark:text-alp-300 border-alp-300 dark:border-alp-600'}`}
          >
            <Icon size={16} />
            {t(labelKey)}
          </button>
        ))}
      </div>

      {tab === 'grammar' && <GrammarReview />}
      {tab === 'verbs' && <VerbsReview />}
      {tab === 'vocabulary' && <VocabularyBrowser />}
      {tab === 'practice' && <PracticeSession />}
      {tab === 'stats' && <StatsReview onPracticeLesson={onOpenLesson} />}
    </div>
  )
}
