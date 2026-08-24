import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { t as translate } from '../data/i18n/strings.js'

export const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [interfaceLang, setInterfaceLang] = useLocalStorage('gruezigo:interfaceLang', 'es')

  const value = {
    interfaceLang,
    setInterfaceLang,
    t: (key, vars) => translate(key, interfaceLang, vars),
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  return ctx
}
