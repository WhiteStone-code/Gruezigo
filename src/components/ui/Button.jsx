import { motion } from 'framer-motion'

export function Button({ variant = 'primary', className = '', children, ...props }) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={`${base} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
