import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { getAllLessonsInOrder } from '../../data/lessons/index.js'
import { Card } from '../ui/Card.jsx'

/**
 * Repaso de gramática: reutiliza el `grammarConcept` y la `comparisonTable`
 * que cada lección ya trae, agrupados como una única chuleta de referencia
 * — sin necesidad de mantener un contenido gramatical aparte.
 */
export function GrammarReview() {
  const { interfaceLang } = useLanguage()
  const lessons = getAllLessonsInOrder()
  const [openId, setOpenId] = useState(lessons[0]?.id ?? null)

  return (
    <div className="space-y-3">
      {lessons.map((lesson) => {
        const isOpen = openId === lesson.id
        return (
          <Card key={lesson.id} className="card-accent-alp !p-0 overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : lesson.id)}
              className="nav-item w-full flex items-center justify-between p-4 text-left"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-alp-500">{lesson.level.split('.')[0]}</p>
                <p className="font-display font-bold text-alp-900 dark:text-alp-50">
                  {lesson.title[interfaceLang] ?? lesson.title.es}
                </p>
              </div>
              <ChevronDown size={18} className={`text-alp-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="px-4 pb-4">
                <p className="text-sm text-alp-600 dark:text-alp-300 mb-3">
                  {lesson.grammarConcept[interfaceLang] ?? lesson.grammarConcept.es}
                </p>
                <div className="overflow-x-auto rounded-xl border border-alp-100 dark:border-alp-700">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-alp-50 dark:bg-alp-900 text-alp-500 dark:text-alp-300 text-left">
                        <th className="p-2 font-semibold">Base</th>
                        <th className="p-2 font-semibold">Hochdeutsch</th>
                        <th className="p-2 font-semibold text-swiss-red">Schwiizerdütsch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lesson.comparisonTable.map((row, idx) => (
                        <tr key={idx} className="border-t border-alp-100 dark:border-alp-700">
                          <td className="p-2 text-alp-700 dark:text-alp-200">{row.base[interfaceLang] ?? row.base.es}</td>
                          <td className="p-2 text-alp-500 dark:text-alp-400">{row.hochdeutsch}</td>
                          <td className="p-2 font-semibold text-swiss-red">{row.schwiizerduetsch}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
