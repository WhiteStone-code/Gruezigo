import { motion } from 'framer-motion'

/**
 * Tarjeta base de GrüeziGo. Con `interactive`, se comporta como un control
 * pulsable (usar cuando toda la tarjeta es un botón/enlace): sube ligeramente
 * al pasar el ratón y se encoge un poco al tocar, con más sombra para dar
 * sensación de profundidad — sin exagerar, esto es una app para aprender, no
 * un juego.
 */
export function Card({ className = '', interactive = false, children, ...props }) {
  if (interactive) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`card hover:shadow-card-lg transition-shadow duration-200 cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  )
}
