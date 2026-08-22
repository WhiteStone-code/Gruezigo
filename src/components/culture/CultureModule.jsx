import { useState } from 'react'
import { Landmark, Snowflake, Compass } from 'lucide-react'
import { Card } from '../ui/Card.jsx'
import { WinterSpecial } from './WinterSpecial.jsx'
import { SurvivalGuide } from './SurvivalGuide.jsx'

const TABS = [
  { id: 'history', label: 'Historia básica', icon: Landmark },
  { id: 'winter', label: 'Invierno', icon: Snowflake },
  { id: 'survival', label: 'Supervivencia', icon: Compass },
]

function HistoryBasics() {
  return (
    <div className="space-y-3">
      <Card className="card-accent-alp">
        <h4 className="font-semibold text-alp-800 dark:text-alp-100 mb-1">Confederación y cantones</h4>
        <p className="text-sm text-alp-600 dark:text-alp-300 leading-relaxed">
          Suiza nace en 1291 como alianza entre tres cantones ("Urkantone"): Uri, Schwyz y Unterwalden. Hoy son 26
          cantones con alto grado de autonomía — cada uno decide sus propios festivos, impuestos y hasta parte de
          su sistema educativo.
        </p>
      </Card>
      <Card className="card-accent-sky">
        <h4 className="font-semibold text-alp-800 dark:text-alp-100 mb-1">Cuatro lenguas nacionales</h4>
        <p className="text-sm text-alp-600 dark:text-alp-300 leading-relaxed">
          Alemán (63%), francés (23%), italiano (8%) y romanche (0.5%). El "Schwiizerdütsch" que aprendes aquí no
          se escribe de forma estandarizada — cada región tiene su propia variante oral.
        </p>
      </Card>
    </div>
  )
}

export function CultureModule() {
  const [tab, setTab] = useState('history')

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-4 pb-24">
      <h2 className="font-display font-bold text-2xl text-alp-900 dark:text-alp-50">Cultura</h2>

      <div className="flex gap-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`nav-item flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-semibold transition-colors min-h-[44px]
              ${tab === id
                ? 'bg-swiss-red text-white border-swiss-red'
                : 'bg-white dark:bg-alp-800 text-alp-600 dark:text-alp-300 border-alp-300 dark:border-alp-600'}`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {tab === 'history' && <HistoryBasics />}
      {tab === 'winter' && <WinterSpecial />}
      {tab === 'survival' && <SurvivalGuide />}
    </div>
  )
}
