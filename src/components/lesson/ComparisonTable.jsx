import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { Button } from '../ui/Button.jsx'

/**
 * Tabla comparativa [Idioma base] vs [Hochdeutsch] vs [Schwiizerdütsch].
 * Es el "momento de aprendizaje" antes de practicar: el usuario ve la
 * diferencia real entre el alemán estándar y el dialecto suizo.
 */
export function ComparisonTable({ lesson, onContinue }) {
  const { interfaceLang, t } = useLanguage()
  const { speak, supportsSynthesis } = useSpeech()

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-swiss-red uppercase tracking-wide">{lesson.level}</p>
        <h2 className="font-display font-bold text-2xl text-alp-900 dark:text-alp-50">
          {lesson.title[interfaceLang] ?? lesson.title.es}
        </h2>
        <p className="text-alp-600 dark:text-alp-300 mt-1 leading-relaxed">{lesson.grammarConcept[interfaceLang] ?? lesson.grammarConcept.es}</p>
      </div>

      <div className="overflow-x-auto rounded-xl2 border border-alp-100 dark:border-alp-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-alp-50 dark:bg-alp-900 text-alp-500 dark:text-alp-300 text-left">
              <th className="p-3 font-semibold">{t('appName') && 'Base'}</th>
              <th className="p-3 font-semibold">Hochdeutsch</th>
              <th className="p-3 font-semibold text-swiss-red">Schwiizerdütsch</th>
              <th className="p-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {lesson.comparisonTable.map((row, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-t border-alp-100 dark:border-alp-700 hover:bg-cheese-50/50 dark:hover:bg-cheese-900/20"
              >
                <td className="p-3 text-alp-700 dark:text-alp-200">{row.base[interfaceLang] ?? row.base.es}</td>
                <td className="p-3 text-alp-500 dark:text-alp-400">{row.hochdeutsch}</td>
                <td className="p-3 font-semibold text-swiss-red">{row.schwiizerduetsch}</td>
                <td className="p-3">
                  {supportsSynthesis && (
                    <button
                      onClick={() => speak(row.schwiizerduetsch, { lang: 'de-DE' })}
                      className="nav-item text-alp-500 hover:text-swiss-red min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Escuchar"
                    >
                      <Volume2 size={16} />
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button onClick={onContinue} className="w-full">
        {t('continue')}
      </Button>
    </div>
  )
}
