import { GrueziGoLogo } from '../brand/GrueziGoLogo.jsx'

export function Header() {
  return (
    <header className="md:hidden relative flex items-center px-4 py-3 border-b border-alp-100 dark:border-alp-700 bg-white dark:bg-alp-800 sticky top-0 z-30">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-swiss-red to-cheese-400" />
      <div className="flex items-center gap-2">
        <GrueziGoLogo size={24} />
        <span className="font-display font-bold text-lg text-swiss-red">GrüeziGo</span>
      </div>
    </header>
  )
}
