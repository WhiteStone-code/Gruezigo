import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext.jsx'

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Módulo "emparejar vocabulario": dos columnas (Schwiizerdütsch <-> idioma
 * base). El usuario selecciona una tarjeta de cada lado; si coinciden se
 * bloquean en verde, si no, parpadean en rojo y se deseleccionan.
 */
export function ExerciseMatchVocabulary({ vocabulary, onComplete }) {
  const { interfaceLang, t } = useLanguage()
  const items = useMemo(() => vocabulary.slice(0, 6), [vocabulary])

  const left = useMemo(() => shuffle(items.map((v) => ({ id: v.id, text: v.schwiizerduetsch }))), [items])
  const right = useMemo(
    () => shuffle(items.map((v) => ({ id: v.id, text: v.base[interfaceLang] ?? v.base.es }))),
    [items, interfaceLang]
  )

  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [matched, setMatched] = useState(new Set())
  const [wrongPair, setWrongPair] = useState(null)
  const [mistakes, setMistakes] = useState(0)

  function evaluate(leftId, rightId) {
    if (leftId === rightId) {
      const next = new Set(matched)
      next.add(leftId)
      setMatched(next)
      setSelectedLeft(null)
      setSelectedRight(null)
      if (next.size === items.length) {
        setTimeout(() => onComplete({ correct: items.length, total: items.length + mistakes }), 400)
      }
    } else {
      setMistakes((m) => m + 1)
      setWrongPair([leftId, rightId])
      setTimeout(() => {
        setWrongPair(null)
        setSelectedLeft(null)
        setSelectedRight(null)
      }, 500)
    }
  }

  function handlePick(side, id) {
    if (matched.has(id) && side === 'left') return
    if (side === 'left') {
      setSelectedLeft(id)
      if (selectedRight) evaluate(id, selectedRight)
    } else {
      if (matched.has(id)) return
      setSelectedRight(id)
      if (selectedLeft) evaluate(selectedLeft, id)
    }
  }

  function cardClass(side, id) {
    const isMatched = matched.has(id)
    const isSelected = side === 'left' ? selectedLeft === id : selectedRight === id
    const isWrong = wrongPair && ((side === 'left' && wrongPair[0] === id) || (side === 'right' && wrongPair[1] === id))
    if (isMatched) return 'bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300 pointer-events-none opacity-70'
    if (isWrong) return 'bg-red-100 border-red-400 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300 animate-pulse'
    if (isSelected) return 'bg-swiss-red/10 border-swiss-red text-swiss-red'
    return 'bg-white dark:bg-alp-900 border-alp-300 dark:border-alp-600 text-alp-800 dark:text-alp-100 hover:border-swiss-red/40'
  }

  return (
    <div>
      <h3 className="font-display font-bold text-lg text-alp-900 dark:text-alp-50 mb-1">Empareja el vocabulario</h3>
      <p className="text-sm text-alp-500 dark:text-alp-300 mb-4">Toca una palabra en Schwiizerdütsch y su traducción correspondiente.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {left.map((card) => (
            <motion.button
              key={card.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => handlePick('left', card.id)}
              className={`w-full text-left p-3 rounded-xl border-2 font-semibold text-sm transition-colors ${cardClass('left', card.id)}`}
            >
              {card.text}
            </motion.button>
          ))}
        </div>
        <div className="space-y-2">
          {right.map((card, idx) => (
            <motion.button
              key={`${card.id}-${idx}`}
              whileTap={{ scale: 0.97 }}
              onClick={() => handlePick('right', card.id)}
              className={`w-full text-left p-3 rounded-xl border-2 text-sm transition-colors ${cardClass('right', card.id)}`}
            >
              {card.text}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
