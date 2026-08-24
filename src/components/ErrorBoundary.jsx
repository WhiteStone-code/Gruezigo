import { Component } from 'react'
import { AlertTriangle } from 'lucide-react'
import { LanguageContext } from '../context/LanguageContext.jsx'
import { t as translate } from '../data/i18n/strings.js'

/**
 * Red de seguridad para toda la app: si cualquier componente lanza un error
 * al renderizar, React por defecto desmonta todo el árbol y deja la
 * pantalla en blanco — exactamente el bug de "se queda pillado" que no
 * queremos. Esto captura ese error y ofrece volver al inicio en vez de un
 * vacío sin explicación.
 */
export class ErrorBoundary extends Component {
  static contextType = LanguageContext

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('[GrüeziGo] Error capturado por ErrorBoundary:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      const lang = this.context?.interfaceLang ?? 'es'
      const t = (key) => translate(key, lang)
      return (
        <div className="min-h-screen bg-alp-50 dark:bg-alp-900 flex items-center justify-center p-6">
          <div className="card-lg max-w-sm w-full text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-swiss-red/10 dark:bg-swiss-red/20 flex items-center justify-center mb-4">
              <AlertTriangle size={28} className="text-swiss-red" />
            </div>
            <h2 className="font-display font-bold text-xl text-alp-900 dark:text-alp-50 mb-2">{t('errorTitle')}</h2>
            <p className="text-sm text-alp-500 dark:text-alp-300 mb-5">{t('errorBody')}</p>
            <button onClick={this.handleReset} className="btn-primary w-full">
              {t('errorButton')}
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
