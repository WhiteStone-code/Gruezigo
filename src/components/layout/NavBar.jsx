import { Home, BookOpen, Calendar, Landmark } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'

const ITEMS = [
  { id: 'dashboard', icon: Home, labelKey: 'dashboard' },
  { id: 'lessons', icon: BookOpen, labelKey: 'lessons' },
  { id: 'calendar', icon: Calendar, labelKey: 'calendar' },
  { id: 'culture', icon: Landmark, labelKey: 'culture' },
]

/**
 * Navegación responsiva: barra inferior fija en móvil/tablet,
 * barra lateral fija en escritorio (>= md).
 */
export function NavBar({ active, onNavigate }) {
  const { t } = useLanguage()

  return (
    <>
      {/* Escritorio */}
      <nav className="hidden md:flex md:flex-col md:w-56 md:shrink-0 border-r border-alp-100 bg-white p-4 gap-1">
        <div className="font-display font-bold text-xl text-swiss-red mb-6 px-2">GrüeziGo 🇨🇭</div>
        {ITEMS.map(({ id, icon: Icon, labelKey }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
              ${active === id ? 'bg-swiss-red/10 text-swiss-red' : 'text-alp-600 hover:bg-alp-50'}`}
          >
            <Icon size={20} />
            {t(labelKey)}
          </button>
        ))}
      </nav>

      {/* Móvil / tablet */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-alp-100 flex justify-around py-2 z-40">
        {ITEMS.map(({ id, icon: Icon, labelKey }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-semibold
              ${active === id ? 'text-swiss-red' : 'text-alp-400'}`}
          >
            <Icon size={22} />
            {t(labelKey)}
          </button>
        ))}
      </nav>
    </>
  )
}
