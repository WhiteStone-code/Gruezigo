import { MapPin } from 'lucide-react'
import { CANTONS } from '../../data/cantons/holidays.js'
import { useLanguage } from '../../context/LanguageContext.jsx'

export function CantonSelector({ value, onChange }) {
  const { t } = useLanguage()

  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-display font-semibold text-alp-700 mb-2">
        <MapPin size={16} className="text-swiss-red" />
        {t('selectCanton')}
      </label>
      <div className="flex flex-wrap gap-2">
        {CANTONS.map((canton) => {
          const active = canton.id === value
          return (
            <button
              key={canton.id}
              onClick={() => onChange(canton.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors
                ${active
                  ? 'bg-swiss-red text-white border-swiss-red shadow-card'
                  : 'bg-white text-alp-700 border-alp-200 hover:border-swiss-red/50'}`}
            >
              {canton.name} <span className="opacity-70">({canton.shortName})</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
