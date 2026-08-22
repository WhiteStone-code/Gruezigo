import { motion } from 'framer-motion'
import { X, Heart } from 'lucide-react'

export function LessonProgressBar({ progress, onExit, lives = 5 }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <button onClick={onExit} className="text-alp-400 hover:text-alp-700" aria-label="Salir de la lección">
        <X size={22} />
      </button>
      <div className="flex-1 h-3 bg-alp-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-swiss-red rounded-full"
          initial={false}
          animate={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
      <div className="flex items-center gap-1 text-swiss-red font-semibold text-sm shrink-0">
        <Heart size={18} fill="currentColor" />
        {lives}
      </div>
    </div>
  )
}
