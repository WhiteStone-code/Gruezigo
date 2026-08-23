import { BookOpen, Sparkles } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { Button } from '../ui/Button.jsx'
import { Card } from '../ui/Card.jsx'

/**
 * Paso "THEORY": tarjeta explicativa de gramática — Hochdeutsch vs.
 * Schwiizerdütsch, con tabla de conjugación opcional y una nota cultural.
 * Es el momento "te explico la regla" antes de practicarla, distinto del
 * `VocabIntroCard` (que es puro vocabulario) — aquí vive la gramática:
 * pronombres, verbos auxiliares, ausencia de pretérito, etc.
 *
 * Forma de los datos (lesson.theory[]):
 * {
 *   id, title: {7 idiomas}, explanation: {7 idiomas},
 *   table?: { headers: ['Pronombre','Hochdeutsch','Schwiizerdütsch'], rows: [[..],[..]] },
 *   culturalNote?: {7 idiomas}
 * }
 */
export function TheoryCard({ theory, onContinue }) {
  const { interfaceLang } = useLanguage()

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <BookOpen size={18} className="text-swiss-red" />
        <p className="text-sm font-semibold text-swiss-red uppercase tracking-wide">Gramática</p>
      </div>
      <h2 className="font-display font-bold text-xl text-alp-900 dark:text-alp-50 mb-3">
        {theory.title[interfaceLang] ?? theory.title.es}
      </h2>

      <Card className="card-accent-alp mb-4">
        <p className="text-sm text-alp-700 dark:text-alp-200 leading-relaxed">
          {theory.explanation[interfaceLang] ?? theory.explanation.es}
        </p>
      </Card>

      {theory.table && (
        <div className="overflow-x-auto rounded-xl2 border border-alp-100 dark:border-alp-700 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-alp-50 dark:bg-alp-900 text-alp-500 dark:text-alp-300 text-left">
                {theory.table.headers.map((h, i) => (
                  <th key={i} className={`p-3 font-semibold ${i === theory.table.headers.length - 1 ? 'text-swiss-red' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {theory.table.rows.map((row, idx) => (
                <tr key={idx} className="border-t border-alp-100 dark:border-alp-700">
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`p-3 ${i === row.length - 1 ? 'font-semibold text-swiss-red' : 'text-alp-700 dark:text-alp-200'}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {theory.culturalNote && (
        <Card className="card-accent-cheese flex gap-3 mb-6">
          <Sparkles size={20} className="text-cheese-600 dark:text-cheese-300 shrink-0 mt-0.5" />
          <p className="text-sm text-alp-600 dark:text-alp-300 leading-relaxed">
            {theory.culturalNote[interfaceLang] ?? theory.culturalNote.es}
          </p>
        </Card>
      )}

      <Button onClick={onContinue} className="w-full">
        Entendido
      </Button>
    </div>
  )
}
