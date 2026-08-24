import { Home, BookOpen, Calendar, Landmark, RotateCcw, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { GrueziGoLogo } from '../brand/GrueziGoLogo.jsx'

const ITEMS = [
  { id: 'dashboard', icon: Home, labelKey: 'dashboard' },
  { id: 'lessons', icon: BookOpen, labelKey: 'lessons' },
  { id: 'review', icon: RotateCcw, labelKey: 'review' },
  { id: 'calendar', icon: Calendar, labelKey: 'calendar' },
  { id: 'culture', icon: Landmark, labelKey: 'culture' },
]

/**
 * Navegación responsiva: barra inferior fija en móvil/tablet,
 * barra lateral fija en escritorio (>= md). "Ajustes" queda anclado
 * abajo del todo en la barra lateral, separado del resto.
 */
export function NavBar({ active, onNavigate }) {
  const { t } = useLanguage()

  return (
    <>
      {/* Escritorio */}
      <nav className="hidden md:flex md:flex-col md:w-56 md:shrink-0 border-r border-alp-100 bg-white dark:bg-alp-800 dark:border-alp-700 relative">
        <div className="h-1 w-full bg-gradient-to-r from-swiss-red to-cheese-400 shrink-0" />
        <div className="flex flex-col flex-1 p-4 gap-1">
          <div className="flex items-center gap-2 mb-6 px-2">
            <GrueziGoLogo size={28} />
            <span className="font-display font-bold text-xl text-swiss-red">GrüeziGo</span>
          </div>
          {ITEMS.map(({ id, icon: Icon, labelKey }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
                ${active === id
                  ? 'bg-swiss-red/10 text-swiss-red dark:bg-swiss-red/20 dark:text-white'
                  : 'text-alp-600 hover:bg-alp-50 dark:text-alp-300 dark:hover:bg-alp-700'}`}
            >
              <Icon size={20} />
              {t(labelKey)}
            </button>
          ))}
          <div className="flex-1" />
          <button
            onClick={() => onNavigate('settings')}
            className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
              ${active === 'settings'
                ? 'bg-swiss-red/10 text-swiss-red dark:bg-swiss-red/20 dark:text-white'
                : 'text-alp-600 hover:bg-alp-50 dark:text-alp-300 dark:hover:bg-alp-700'}`}
          >
            <Settings size={20} />
            {t('settings')}
          </button>
        </div>
      </nav>

      {/* Móvil / tablet */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-alp-800 border-t border-alp-100 dark:border-alp-700 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] flex justify-around py-1 z-40">
        {[...ITEMS, { id: 'settings', icon: Settings, labelKey: 'settings' }].map(({ id, icon: Icon, labelKey }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`nav-item relative flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] px-2 text-[10px] font-semibold
              ${active === id ? 'text-swiss-red dark:text-cheese-300' : 'text-alp-500 dark:text-alp-400'}`}
          >
            {active === id && (
              <motion.span
                layoutId="nav-active-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute top-0 w-8 h-1 rounded-full bg-swiss-red dark:bg-cheese-300"
              />
            )}
            <Icon size={20} />
            {t(labelKey)}
          </button>
        ))}
      </nav>
    </>
  )
}
