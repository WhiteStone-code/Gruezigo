import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { Button } from '../ui/Button.jsx'

/**
 * Introduce un bloque pequeño (2-3 palabras) como flashcards, con el
 * contraste Hochdeutsch incluido en cada tarjeta — sustituye a la tabla
 * comparativa completa como paso separado: aprendes 2-3 palabras a fondo,
 * las practicas, y pasas al siguiente bloque, en vez de leer las 6-8 de
 * golpe antes de practicar ninguna.
 */
export function VocabIntroCard({ words, partLabel, onContinue }) {
  const { interfaceLang } = useLanguage()
  const { speak, supportsSynthesis } = useSpeech()

  return (
    <div>
      {partLabel && <p className="text-sm font-semibold text-swiss-red uppercase tracking-wide mb-1">{partLabel}</p>}
      <h3 className="font-display font-bold text-xl text-alp-900 dark:text-alp-50 mb-4">Palabras nuevas</h3>

      <div className="space-y-3 mb-6">
        {words.map((word, idx) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card-accent-sky card flex items-center justify-between gap-3"
          >
            <div>
              <p className="font-display font-bold text-lg text-swiss-red">{word.schwiizerduetsch}</p>
              <p className="text-xs text-alp-500">Hochdeutsch: {word.hochdeutsch}</p>
              <p className="text-sm text-alp-700 dark:text-alp-200">{word.base[interfaceLang] ?? word.base.es}</p>
            </div>
            {supportsSynthesis && (
              <button
                onClick={() => speak(word.audioText, { lang: 'de-DE' })}
                className="nav-item w-11 h-11 rounded-full bg-alp-50 dark:bg-alp-900 text-alp-500 dark:text-alp-300 hover:text-swiss-red flex items-center justify-center shrink-0"
                aria-label="Escuchar"
              >
                <Volume2 size={20} />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <Button onClick={onContinue} className="w-full">
        A practicarlas
      </Button>
    </div>
  )
}
