import { MapPin } from 'lucide-react'
import { CANTONS } from '../../data/cantons/holidays.js'
import { useLanguage } from '../../context/LanguageContext.jsx'

export function CantonSelector({ value, onChange }) {
  const { t } = useLanguage()

  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-display font-semibold text-alp-700 dark:text-alp-200 mb-2">
        <MapPin size={16} className="text-swiss-red" />
        {t('selectCanton')}
      </label>
      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
        {CANTONS.map((canton) => {
          const active = canton.id === value
          return (
            <button
              key={canton.id}
              onClick={() => onChange(canton.id)}
              className={`nav-item px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors
                ${active
                  ? 'text-white border-transparent shadow-card'
                  : 'bg-white dark:bg-alp-900 text-alp-700 dark:text-alp-200 border-alp-300 dark:border-alp-600 hover:border-swiss-red/50'}`}
              style={active ? { backgroundColor: canton.color } : undefined}
            >
              {canton.name} <span className="opacity-70">({canton.shortName})</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
