import { motion } from 'framer-motion'
import { Lock, Check } from 'lucide-react'

/**
 * "Portada" ilustrada de un nivel, al estilo de la tapa de un librito de
 * frases suizo: gradiente de color propio del nivel + un par de emojis a
 * modo de ilustración. 100% autocontenido (sin imágenes externas).
 */
export function LevelCoverArt({ level, state = 'locked', size = 'md' }) {
  // state: 'done' | 'current' | 'unlocked' | 'locked'
  const dim = size === 'lg' ? 'h-28' : 'h-20'
  const emojiSize = size === 'lg' ? 'text-4xl' : 'text-2xl'

  return (
    <div
      className={`relative ${dim} rounded-xl2 bg-gradient-to-br ${level.gradient} overflow-hidden flex items-center justify-center shrink-0
        ${state === 'locked' ? 'grayscale opacity-60' : ''}`}
    >
      <motion.span
        initial={false}
        animate={state === 'current' ? { y: [0, -3, 0] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`${emojiSize} absolute -left-1 -bottom-1 opacity-90`}
      >
        {level.emoji[0]}
      </motion.span>
      <span className={`${emojiSize} absolute -right-1 -top-1 opacity-90`}>{level.emoji[1]}</span>

      <span className="relative z-10 font-display font-extrabold text-white text-sm bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
        {level.code}
      </span>

      {state === 'locked' && (
        <div className="absolute inset-0 bg-alp-900/30 flex items-center justify-center">
          <Lock size={18} className="text-white" />
        </div>
      )}
      {state === 'done' && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <Check size={12} className="text-white" strokeWidth={3} />
        </div>
      )}
    </div>
  )
}
