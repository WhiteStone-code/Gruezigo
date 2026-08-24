import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, Volume2, CheckCircle2, XCircle, SkipForward } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { Button } from '../ui/Button.jsx'

/**
 * Módulo "ejercicio de voz": el usuario escucha la frase objetivo, la repite
 * en voz alta y SpeechRecognition compara el resultado (comparación
 * tolerante, ver useSpeech.matchesExpected) con expectedText.
 *
 * Importante: el micrófono puede fallar por mil motivos ajenos al alumno
 * (permiso denegado, sin hardware, sin red, no detecta nada) — por eso
 * SIEMPRE hay una forma de avanzar (botón "Saltar"), nunca solo "Reintentar".
 * Antes, si el reconocimiento no daba resultado, no aparecía ningún botón y
 * la lección quedaba literalmente bloqueada ahí.
 */
export function ExerciseSpeaking({ exercises, onComplete }) {
  const { interfaceLang, t } = useLanguage()
  const { speak, startListening, matchesExpected, isListening, transcript, supportsRecognition, supportsSynthesis } =
    useSpeech()

  const [index, setIndex] = useState(0)
  const [result, setResult] = useState(null) // null | 'correct' | 'incorrect' | 'error'
  const [correctCount, setCorrectCount] = useState(0)

  const current = exercises[index]

  function handleAttempt() {
    if (isListening) return
    setResult(null)
    startListening({
      lang: current.lang ?? 'de-DE',
      timeoutMs: 6000,
      onResult: (heard) => {
        const ok = matchesExpected(heard, current.expectedText)
        setResult(ok ? 'correct' : 'incorrect')
        if (ok) setCorrectCount((c) => c + 1)
      },
      onError: () => setResult('error'),
    })
  }

  function next() {
    if (index + 1 >= exercises.length) {
      onComplete({ correct: correctCount, total: exercises.length })
      return
    }
    setIndex((i) => i + 1)
    setResult(null)
  }

  return (
    <div>
      <h3 className="font-display font-bold text-lg text-alp-900 dark:text-alp-50 mb-1">{t('speakNow')}</h3>
      <p className="text-sm text-alp-500 dark:text-alp-300 mb-4">{current.hint[interfaceLang] ?? current.hint.es}</p>

      <div className="card bg-alp-50 dark:bg-alp-900 flex items-center justify-between mb-6">
        <p className="font-display font-bold text-xl text-alp-900 dark:text-alp-50">{current.expectedText}</p>
        {supportsSynthesis && (
          <button
            onClick={() => speak(current.expectedText, { lang: current.lang ?? 'de-DE' })}
            className="nav-item text-alp-500 dark:text-alp-300 hover:text-swiss-red shrink-0 ml-3 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Escuchar pronunciación"
          >
            <Volume2 size={22} />
          </button>
        )}
      </div>

      {!supportsRecognition ? (
        <p className="text-sm text-alp-500 mb-4">
          Tu navegador no soporta reconocimiento de voz. Prueba con Chrome/Edge de escritorio o Android — mientras
          tanto, puedes saltar este ejercicio.
        </p>
      ) : (
        <div className="flex flex-col items-center gap-3 mb-6">
          <motion.button
            onClick={handleAttempt}
            whileTap={{ scale: 0.92 }}
            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: isListening ? Infinity : 0, duration: 0.7 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-card text-white
              ${isListening ? 'bg-swiss-red' : 'bg-alp-800 hover:bg-alp-700 dark:bg-alp-700 dark:hover:bg-alp-600'}`}
          >
            <Mic size={32} />
          </motion.button>
          <p className="text-xs text-alp-500">{isListening ? 'Escuchando... (máx. 6s)' : 'Toca y habla'}</p>
          {transcript && <p className="text-sm text-alp-600 dark:text-alp-300 italic">"{transcript}"</p>}
        </div>
      )}

      {result && result !== 'error' && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className={`flex items-center gap-2 font-semibold ${result === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
            {result === 'correct' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            {result === 'correct' ? t('correct') : t('incorrect')}
          </div>
        </motion.div>
      )}

      {result === 'error' && (
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-alp-500 dark:text-alp-300 mb-4">
          No se pudo captar tu voz (¿micrófono bloqueado o sin conexión?). Puedes intentarlo otra vez o saltar este ejercicio.
        </motion.p>
      )}

      <div className="flex gap-2">
        {(result === 'incorrect' || result === 'error') && (
          <Button variant="secondary" onClick={handleAttempt} className="flex-1">
            Reintentar
          </Button>
        )}
        {result === 'correct' ? (
          <Button onClick={next} className="flex-1">
            {t('continue')}
          </Button>
        ) : (
          <Button variant="secondary" onClick={next} className="flex-1 flex items-center justify-center gap-1.5">
            <SkipForward size={16} /> Saltar
          </Button>
        )}
      </div>
    </div>
  )
}
