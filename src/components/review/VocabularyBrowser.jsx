import { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, ArrowLeft, Briefcase } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useSpeech } from '../../hooks/useSpeech.js'
import { VOCAB_THEMES } from '../../data/vocabulary/themes.js'
import { PROFESSIONS } from '../../data/vocabulary/professions.js'
import { Card } from '../ui/Card.jsx'

function WordCard({ word }) {
  const { interfaceLang } = useLanguage()
  const { speak, supportsSynthesis } = useSpeech()
  return (
    <div className="p-3 rounded-xl bg-alp-50 dark:bg-alp-900 flex items-center justify-between gap-2">
      <div>
        <p className="font-semibold text-swiss-red">{word.schwiizerduetsch}</p>
        <p className="text-xs text-alp-500">{word.hochdeutsch}</p>
        <p className="text-sm text-alp-700 dark:text-alp-200">{word.base[interfaceLang] ?? word.base.es}</p>
      </div>
      {supportsSynthesis && (
        <button
          onClick={() => speak(word.audioText, { lang: 'de-DE' })}
          className="nav-item text-alp-500 hover:text-swiss-red shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Escuchar"
        >
          <Volume2 size={18} />
        </button>
      )}
    </div>
  )
}

function ThemesGrid({ onOpen }) {
  const { interfaceLang } = useLanguage()
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {VOCAB_THEMES.map((theme) => (
        <motion.button
          key={theme.id}
          whileTap={{ scale: 0.96 }}
          onClick={() => onOpen(theme.id)}
          className="card !p-4 flex flex-col items-center gap-1 hover:-translate-y-0.5 transition-transform"
        >
          <span className="text-3xl">{theme.icon}</span>
          <span className="font-semibold text-alp-800 dark:text-alp-100 text-sm text-center">
            {theme.title[interfaceLang] ?? theme.title.es}
          </span>
          <span className="text-xs text-alp-500">{theme.words.length} palabras</span>
        </motion.button>
      ))}
    </div>
  )
}

function ProfessionsGrid({ onOpen }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {PROFESSIONS.map((prof) => (
        <motion.button
          key={prof.id}
          whileTap={{ scale: 0.96 }}
          onClick={() => onOpen(prof.id)}
          className="card !p-3 flex flex-col items-center gap-1 hover:-translate-y-0.5 transition-transform"
        >
          <span className="text-2xl">{prof.emoji}</span>
          <span className="font-semibold text-alp-800 dark:text-alp-100 text-xs text-center leading-tight">
            {prof.schwiizerduetsch}
          </span>
        </motion.button>
      ))}
    </div>
  )
}

function ProfessionDetail({ profession, onBack }) {
  const { interfaceLang } = useLanguage()
  const { speak, supportsSynthesis } = useSpeech()
  return (
    <Card className="card-accent-cheese">
      <button onClick={onBack} className="nav-item flex items-center gap-1 text-sm text-alp-500 dark:text-alp-300 mb-3 min-h-[44px]">
        <ArrowLeft size={16} /> Volver
      </button>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">{profession.emoji}</span>
        <div>
          <p className="font-display font-bold text-lg text-swiss-red">{profession.schwiizerduetsch}</p>
          <p className="text-xs text-alp-500">{profession.hochdeutsch}</p>
        </div>
      </div>
      <p className="text-sm text-alp-600 dark:text-alp-300 leading-relaxed mb-4">
        {profession.description[interfaceLang] ?? profession.description.es}
      </p>
      <p className="text-xs font-bold uppercase tracking-wide text-alp-500 mb-2">Frases útiles</p>
      <div className="space-y-2">
        {profession.usefulPhrases.map((phrase, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-alp-50 dark:bg-alp-900 flex items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-alp-800 dark:text-alp-100 text-sm">{phrase.schwiizerduetsch}</p>
              <p className="text-xs text-alp-500">{phrase.hochdeutsch}</p>
              <p className="text-sm text-alp-600 dark:text-alp-300">{phrase.base[interfaceLang] ?? phrase.base.es}</p>
            </div>
            {supportsSynthesis && (
              <button
                onClick={() => speak(phrase.schwiizerduetsch, { lang: 'de-DE' })}
                className="nav-item text-alp-500 hover:text-swiss-red shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Escuchar"
              >
                <Volume2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

/**
 * Biblioteca de vocabulario del Repaso: temas (familia, animales, colegio...)
 * y un bloque especial de "Oficios" con frases específicas para tratar con
 * cada profesión (médico, panadero, profesor...).
 */
export function VocabularyBrowser() {
  const { interfaceLang } = useLanguage()
  const [tab, setTab] = useState('themes') // 'themes' | 'professions'
  const [openTheme, setOpenTheme] = useState(null)
  const [openProfession, setOpenProfession] = useState(null)

  const theme = VOCAB_THEMES.find((t) => t.id === openTheme)
  const profession = PROFESSIONS.find((p) => p.id === openProfession)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => { setTab('themes'); setOpenProfession(null) }}
          className={`nav-item flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors min-h-[44px]
            ${tab === 'themes' ? 'bg-swiss-red text-white border-swiss-red' : 'bg-white dark:bg-alp-800 text-alp-600 dark:text-alp-300 border-alp-300 dark:border-alp-600'}`}
        >
          Temas
        </button>
        <button
          onClick={() => { setTab('professions'); setOpenTheme(null) }}
          className={`nav-item flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors min-h-[44px] flex items-center justify-center gap-1.5
            ${tab === 'professions' ? 'bg-swiss-red text-white border-swiss-red' : 'bg-white dark:bg-alp-800 text-alp-600 dark:text-alp-300 border-alp-300 dark:border-alp-600'}`}
        >
          <Briefcase size={16} /> Oficios
        </button>
      </div>

      {tab === 'themes' && (
        theme ? (
          <Card className="card-accent-sky">
            <button onClick={() => setOpenTheme(null)} className="nav-item flex items-center gap-1 text-sm text-alp-500 dark:text-alp-300 mb-3 min-h-[44px]">
              <ArrowLeft size={16} /> Volver
            </button>
            <h4 className="font-display font-bold text-lg text-alp-900 dark:text-alp-50 mb-3">
              {theme.icon} {theme.title[interfaceLang] ?? theme.title.es}
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {theme.words.map((word) => (
                <WordCard key={word.id} word={word} />
              ))}
            </div>
          </Card>
        ) : (
          <ThemesGrid onOpen={setOpenTheme} />
        )
      )}

      {tab === 'professions' && (
        profession ? (
          <ProfessionDetail profession={profession} onBack={() => setOpenProfession(null)} />
        ) : (
          <ProfessionsGrid onOpen={setOpenProfession} />
        )
      )}
    </div>
  )
}
