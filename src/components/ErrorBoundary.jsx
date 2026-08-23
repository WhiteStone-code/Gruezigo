import { Component } from 'react'
import { AlertTriangle } from 'lucide-react'

/**
 * Red de seguridad para toda la app: si cualquier componente lanza un error
 * al renderizar, React por defecto desmonta todo el árbol y deja la
 * pantalla en blanco — exactamente el bug de "se queda pillado" que no
 * queremos. Esto captura ese error y ofrece volver al inicio en vez de un
 * vacío sin explicación.
 */
export class ErrorBoundary extends Component {
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
      return (
        <div className="min-h-screen bg-alp-50 dark:bg-alp-900 flex items-center justify-center p-6">
          <div className="card max-w-sm w-full text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-swiss-red/10 dark:bg-swiss-red/20 flex items-center justify-center mb-4">
              <AlertTriangle size={28} className="text-swiss-red" />
            </div>
            <h2 className="font-display font-bold text-xl text-alp-900 dark:text-alp-50 mb-2">Vaya, algo se atascó</h2>
            <p className="text-sm text-alp-500 dark:text-alp-300 mb-5">
              No perdiste tu progreso — solo esta pantalla falló. Vuelve al inicio e inténtalo de nuevo.
            </p>
            <button onClick={this.handleReset} className="btn-primary w-full">
              Volver al inicio
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
