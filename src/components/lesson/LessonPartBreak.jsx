import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button.jsx'

/**
 * Micro-celebración entre "partes" de la lección (no la pantalla final) —
 * un respiro corto de "vas bien" cada 2 bloques de vocabulario, al estilo
 * de las mini-lecciones de una app de idiomas, en vez de un único tramo largo sin
 * ninguna pausa hasta el final.
 */
export function LessonPartBreak({ partNumber, totalParts, onContinue }) {
  return (
    <div className="text-center py-10">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14 }}
        className="w-16 h-16 mx-auto rounded-full bg-meadow-100 dark:bg-meadow-900/40 flex items-center justify-center mb-4"
      >
        <CheckCircle2 size={32} className="text-meadow-600 dark:text-meadow-300" />
      </motion.div>
      <p className="font-display font-bold text-lg text-alp-900 dark:text-alp-50 mb-1">
        Parte {partNumber} de {totalParts} lista ✓
      </p>
      <p className="text-sm text-alp-500 dark:text-alp-300 mb-6">Vas muy bien — sigamos.</p>
      <Button onClick={onContinue} className="w-full max-w-xs mx-auto">
        Continuar
      </Button>
    </div>
  )
}
