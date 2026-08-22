import { Globe } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { SUPPORTED_LANGUAGES } from '../../data/i18n/strings.js'

export function Header() {
  const { interfaceLang, setInterfaceLang } = useLanguage()

  return (
    <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-alp-100 bg-white sticky top-0 z-30">
      <span className="font-display font-bold text-lg text-swiss-red">GrüeziGo 🇨🇭</span>
      <div className="flex items-center gap-1 text-alp-500">
        <Globe size={16} />
        <select
          value={interfaceLang}
          onChange={(e) => setInterfaceLang(e.target.value)}
          className="text-sm bg-transparent font-semibold text-alp-700 focus:outline-none"
        >
          {SUPPORTED_LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.flag} {l.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  )
}
