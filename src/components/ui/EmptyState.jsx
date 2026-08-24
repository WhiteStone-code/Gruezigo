import { motion } from 'framer-motion'

/**
 * Estado vacío estándar de GrüeziGo: icono/emoji en una insignia con
 * degradado suave (misma familia de color que las tarjetas), título claro
 * y una descripción que anima a dar el siguiente paso — nunca un simple
 * "no hay datos".
 */
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="text-center py-10 px-6">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cheese-100 to-cheese-200 dark:from-cheese-900/40 dark:to-cheese-800/30 flex items-center justify-center mb-4 text-3xl shadow-sm"
      >
        {icon}
      </motion.div>
      <p className="font-display font-bold text-alp-900 dark:text-alp-50 mb-1">{title}</p>
      {description && <p className="text-sm text-alp-500 dark:text-alp-300 max-w-xs mx-auto mb-4">{description}</p>}
      {action}
    </div>
  )
}
