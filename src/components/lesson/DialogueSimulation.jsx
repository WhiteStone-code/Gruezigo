import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { Button } from '../ui/Button.jsx'

/**
 * Paso "DIALOGUE_SIMULATION": chat interactivo que simula una situación
 * real (comprar pan en la Coop, pedir en un restaurante...). Los turnos del
 * NPC aparecen solos; en los turnos del usuario, elige una de varias
 * respuestas en Schwiizerdütsch — cada opción tiene una corrección
 * implícita (no todas son igual de acertadas) con feedback breve.
 *
 * Forma de los datos (lesson.dialogueSimulations[]):
 * {
 *   id, scenario: {7 idiomas}, npcName, npcEmoji,
 *   turns: [
 *     { speaker: 'npc', text, base: {7} },
 *     { speaker: 'user', options: [{ text, base: {7}, correct, feedback: {7} }] },
 *     ...
 *   ]
 * }
 */
export function DialogueSimulation({ simulation, onComplete }) {
  const { interfaceLang } = useLanguage()
  const { speak, supportsSynthesis } = useSpeech()
  const [history, setHistory] = useState([]) // { speaker, text, base, correct? }
  const [turnIndex, setTurnIndex] = useState(0)
  const [correctChoices, setCorrectChoices] = useState(0)
  const [totalChoices, setTotalChoices] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const turns = simulation.turns
  const currentTurn = turns[turnIndex]
  const done = turnIndex >= turns.length

  // Los turnos del NPC se añaden solos, con un pequeño retardo tipo "escribiendo...".
  useEffect(() => {
    if (done || !currentTurn || currentTurn.speaker !== 'npc') return
    const t = setTimeout(() => {
      setHistory((h) => [...h, { speaker: 'npc', text: currentTurn.text, base: currentTurn.base }])
      setTurnIndex((i) => i + 1)
    }, 500)
    return () => clearTimeout(t)
  }, [turnIndex, currentTurn, done])

  function chooseOption(opt) {
    setHistory((h) => [...h, { speaker: 'user', text: opt.text, base: opt.base, correct: opt.correct }])
    setTotalChoices((n) => n + 1)
    if (opt.correct) setCorrectChoices((n) => n + 1)
    setFeedback(opt.feedback ? (opt.feedback[interfaceLang] ?? opt.feedback.es) : null)
  }

  function continueAfterChoice() {
    setFeedback(null)
    setTurnIndex((i) => i + 1)
  }

  return (
    <div>
      <p className="text-sm font-semibold text-swiss-red uppercase tracking-wide mb-1">Simulación</p>
      <h3 className="font-display font-bold text-lg text-alp-900 dark:text-alp-50 mb-4">
        {simulation.scenario[interfaceLang] ?? simulation.scenario.es}
      </h3>

      <div className="rounded-xl2 bg-alp-50 dark:bg-alp-900 border border-alp-100 dark:border-alp-700 p-4 space-y-3 mb-4 max-h-[22rem] overflow-y-auto">
        {history.map((line, idx) => {
          const isUser = line.speaker === 'user'
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <span className="text-xl shrink-0">{isUser ? '🧑' : simulation.npcEmoji ?? '🧑‍🍳'}</span>
              <div
                className={`max-w-[78%] rounded-2xl px-3 py-2 shadow-sm ${
                  isUser
                    ? line.correct === false
                      ? 'bg-red-100 dark:bg-red-900/30 rounded-br-sm'
                      : 'bg-swiss-red/10 dark:bg-swiss-red/20 rounded-br-sm'
                    : 'bg-white dark:bg-alp-800 rounded-bl-sm'
                }`}
              >
                <p className="font-semibold text-sm text-alp-900 dark:text-alp-50">{line.text}</p>
                <p className="text-xs text-alp-500 dark:text-alp-400">{line.base[interfaceLang] ?? line.base.es}</p>
              </div>
            </motion.div>
          )
        })}
        {!done && currentTurn?.speaker === 'npc' && (
          <p className="text-xs text-alp-500 italic">escribiendo…</p>
        )}
      </div>

      {feedback && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-accent-cheese card mb-4">
          <p className="text-sm text-alp-700 dark:text-alp-200">{feedback}</p>
        </motion.div>
      )}

      {!done && currentTurn?.speaker === 'user' && !feedback && (
        <div className="space-y-2">
          {currentTurn.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => chooseOption(opt)}
              className="w-full text-left p-3 rounded-xl border-2 border-alp-300 dark:border-alp-600 bg-white dark:bg-alp-900 hover:border-swiss-red/40 transition-colors flex items-center justify-between gap-2"
            >
              <div>
                <p className="font-semibold text-sm text-alp-900 dark:text-alp-50">{opt.text}</p>
                <p className="text-xs text-alp-500 dark:text-alp-400">{opt.base[interfaceLang] ?? opt.base.es}</p>
              </div>
              {supportsSynthesis && (
                <span
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    speak(opt.text, { lang: 'de-DE' })
                  }}
                  className="text-alp-500 hover:text-swiss-red shrink-0"
                >
                  <Volume2 size={16} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {feedback && (
        <Button onClick={continueAfterChoice} className="w-full">
          Continuar
        </Button>
      )}

      {done && (
        <Button onClick={() => onComplete({ correct: correctChoices, total: totalChoices })} className="w-full">
          Terminar simulación
        </Button>
      )}
    </div>
  )
}
