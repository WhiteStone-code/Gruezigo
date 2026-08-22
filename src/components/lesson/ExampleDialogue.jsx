import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { Button } from '../ui/Button.jsx'

/**
 * Diálogo de ejemplo ilustrado ("cómic") que abre cada lección — el momento
 * "así se usa en la vida real" antes de pasar a los ejercicios, al estilo de
 * los diálogos de apertura de un libro de frases suizo.
 */
export function ExampleDialogue({ lesson, onContinue }) {
  const { interfaceLang, t } = useLanguage()
  const { speak, supportsSynthesis } = useSpeech()

  return (
    <div>
      <p className="text-sm font-semibold text-swiss-red uppercase tracking-wide mb-1">Escucha primero</p>
      <h2 className="font-display font-bold text-2xl text-alp-900 mb-4">
        {lesson.title[interfaceLang] ?? lesson.title.es}
      </h2>

      <div className="rounded-xl2 bg-alp-50 border border-alp-100 p-4 space-y-3 mb-6">
        {lesson.dialogueExample.map((line, idx) => {
          const isLeft = idx % 2 === 0
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isLeft ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={`flex items-end gap-2 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <span className="text-2xl shrink-0">{line.speaker}</span>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm
                  ${isLeft ? 'bg-white rounded-bl-sm' : 'bg-swiss-red/10 rounded-br-sm'}`}
              >
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-alp-900">{line.schwiizerduetsch}</p>
                  {supportsSynthesis && (
                    <button
                      onClick={() => speak(line.schwiizerduetsch, { lang: 'de-DE' })}
                      className="text-alp-400 hover:text-swiss-red shrink-0"
                      aria-label="Escuchar"
                    >
                      <Volume2 size={14} />
                    </button>
                  )}
                </div>
                <p className="text-xs text-alp-500 mt-0.5">{line.base[interfaceLang] ?? line.base.es}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <Button onClick={onContinue} className="w-full">
        {t('continue')}
      </Button>
    </div>
  )
}
