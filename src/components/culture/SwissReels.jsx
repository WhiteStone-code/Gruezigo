import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { SWISS_REELS } from '../../data/swissReels.js'

const CARD_GRADIENTS = [
  'from-swiss-red to-cheese-500',
  'from-alp-500 to-alp-800',
  'from-cheese-500 to-wood-700',
  'from-meadow-500 to-alp-700',
  'from-wood-500 to-swiss-red-dark',
]

/**
 * "Modo Reels": una cápsula a pantalla completa por dicho/curiosidad,
 * al estilo historias de redes sociales (puntitos de progreso arriba,
 * toca a los lados para avanzar/retroceder) — pero con texto y audio, no
 * vídeo real (no hay ninguna herramienta de generación de vídeo
 * disponible). La idea es la misma: contenido corto, gracioso, que
 * engancha en pocos segundos, sin ser una lección formal.
 */
export function SwissReels({ onClose }) {
  const { interfaceLang } = useLanguage()
  const { speak, supportsSynthesis } = useSpeech()
  const [index, setIndex] = useState(0)

  const card = SWISS_REELS[index]
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length]

  function goTo(i) {
    if (i < 0 || i >= SWISS_REELS.length) return
    setIndex(i)
  }

  function handleTap(e) {
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const tapX = e.clientX - left
    if (tapX < width / 2) goTo(index - 1)
    else goTo(index + 1)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="relative w-full max-w-md h-full sm:h-[85vh] sm:rounded-xl2 overflow-hidden">
        {/* Puntitos de progreso, uno por cápsula */}
        <div className="absolute top-3 inset-x-3 z-20 flex gap-1.5">
          {SWISS_REELS.map((r, i) => (
            <div key={r.id} className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden">
              <div className={`h-full bg-white transition-all ${i < index ? 'w-full' : i === index ? 'w-full' : 'w-0'}`} />
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-8 right-3 z-20 w-9 h-9 rounded-full bg-black/30 text-white flex items-center justify-center"
        >
          <X size={18} />
        </button>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleTap}
            className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-center px-8 cursor-pointer select-none`}
          >
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="text-7xl mb-6"
            >
              {card.emoji}
            </motion.span>

            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Hochdeutsch</p>
            <p className="text-white/90 text-base mb-4">{card.hochdeutsch}</p>

            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Schwiizerdütsch</p>
            <p className="font-display font-bold text-white text-2xl mb-5 leading-snug">{card.schwiizerduetsch}</p>

            <p className="text-white/95 text-sm leading-relaxed max-w-xs">
              {card.base[interfaceLang] ?? card.base.es}
            </p>

            {supportsSynthesis && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  speak(card.schwiizerduetsch, { lang: 'de-DE' })
                }}
                aria-label="Escuchar"
                className="mt-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
              >
                <Volume2 size={22} />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
